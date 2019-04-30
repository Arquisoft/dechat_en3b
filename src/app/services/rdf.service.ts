import { Injectable } from '@angular/core';
import { SolidSession } from '../models/solid-session.model';
declare let solid: any;
declare let $rdf: any;
// import * as $rdf from 'rdflib'

// TODO: Remove any UI interaction from this service
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Friend } from '../models/friend.model';
import { Chat } from '../models/chat.model';
import { Message } from '../models/message.model';

const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const TERMS = $rdf.Namespace('http://purl.org/dc/terms/');
const fileClient = require('solid-file-client');

/**
 * A service layer for RDF data manipulation using rdflib.js
 * @see https://solid.inrupt.com/docs/manipulating-ld-with-rdflib
 */
@Injectable({
  providedIn: 'root',
})
export class RdfService {

  session: SolidSession;
  store = $rdf.graph();

  newChatFriends: string[] = [];
  chats: Chat[] = [];
  friends: Friend[] = [];
  messages: Message[] = [];
  selectedChat: Chat;

  /**
   * A helper object that connects to the web, loads data, and saves it back. More powerful than using a simple
   * store object.
   * When you have a fetcher, then you also can ask the query engine to go fetch new linked data automatically
   * as your query makes its way across the web.
   * @see http://linkeddata.github.io/rdflib.js/doc/Fetcher.html
   */
  fetcher = $rdf.Fetcher;

  /**
   * The UpdateManager allows you to send small changes to the server to “patch” the data as your user changes data in
   * real time. It also allows you to subscribe to changes other people make to the same file, keeping track of
   * upstream and downstream changes, and signaling any conflict between them.
   * @see http://linkeddata.github.io/rdflib.js/doc/UpdateManager.html
   */
  updateManager = $rdf.UpdateManager;

  constructor (private toastr: ToastrService) {
    const fetcherOptions = {};
    this.fetcher = new $rdf.Fetcher(this.store, fetcherOptions);
    this.updateManager = new $rdf.UpdateManager(this.store);
    this.getSession().then(s => {
      this.newChatFriends.push(this.session.webId);
    });
    this.createFolders();


  }

  /**
   * Fetches the session from Solid, and store results in localStorage
   */
  getSession = async() => {
    this.session = await solid.auth.currentSession(localStorage);
  }

  /**
   * Gets a node that matches the specified pattern using the VCARD onthology
   *
   * any() can take a subject and a predicate to find Any one person identified by the webId
   * that matches against the node/predicated
   *
   * @param {string} node VCARD predicate to apply to the $rdf.any()
   * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
   * @return {string} The value of the fetched node or an emtpty string
   * @see https://github.com/solid/solid-tutorial-rdflib.js
   */
  getValueFromVcard = (node: string, webId?: string): string | any => {
    return this.getValueFromNamespace(node, VCARD, webId);
  }

  /**
   * Gets a node that matches the specified pattern using the FOAF onthology
   * @param {string} node FOAF predicate to apply to the $rdf.any()
   * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
   * @return {string} The value of the fetched node or an emtpty string
   */
  getValueFromFoaf = (node: string, webId?: string) => {
    return this.getValueFromNamespace(node, FOAF, webId);
  }

  transformDataForm = (form: NgForm, me: any, doc: any) => {
    const insertions = [];
    const deletions = [];
    const fields = Object.keys(form.value);
    const oldProfileData = JSON.parse(localStorage.getItem('oldProfileData')) || {};

    // We need to split out into three code paths here:
    // 1. There is an old value and a new value. This is the update path
    // 2. There is no old value and a new value. This is the insert path
    // 3. There is an old value and no new value. Ths is the delete path
    // These are separate codepaths because the system needs to know what to do in each case
    fields.map(field => {

// tslint:disable-next-line: prefer-const
      let predicate = VCARD(this.getFieldName(field));
// tslint:disable-next-line: prefer-const
      let subject = this.getUriForField(field, me);
// tslint:disable-next-line: prefer-const
      let why = doc;

// tslint:disable-next-line: prefer-const
      let fieldValue = this.getFieldValue(form, field);
// tslint:disable-next-line: prefer-const
      let oldFieldValue = this.getOldFieldValue(field, oldProfileData);

      // if there's no existing home phone number or email address, we need to add one, then add the link for hasTelephone or hasEmail
      if (!oldFieldValue && fieldValue && (field === 'phone' || field === 'email')) {
        this.addNewLinkedField(field, insertions, predicate, fieldValue, why, me);
      } else {

        // Add a value to be updated
        if (oldProfileData[field] && form.value[field] && !form.controls[field].pristine) {
          deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
          insertions.push($rdf.st(subject, predicate, fieldValue, why));
        } else if (oldProfileData[field] && !form.value[field] && !form.controls[field].pristine) {
          deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
        } else if (!oldProfileData[field] && form.value[field] && !form.controls[field].pristine) {
          insertions.push($rdf.st(subject, predicate, fieldValue, why));
        }
      }
    });

    return {
      insertions: insertions,
      deletions: deletions
    };
  }

  private addNewLinkedField(field, insertions, predicate, fieldValue, why, me: any) {
    // Generate a new ID. This id can be anything but needs to be unique.
// tslint:disable-next-line: prefer-const
    let newId = field + ':' + Date.now();

    // Get a new subject, using the new ID
// tslint:disable-next-line: prefer-const
    let newSubject = $rdf.sym(this.session.webId.split('#')[0] + '#' + newId);

    // Set new predicate, based on email or phone fields
// tslint:disable-next-line: prefer-const
    let newPredicate = field === 'phone' ? $rdf.sym(VCARD('hasTelephone')) : $rdf.sym(VCARD('hasEmail'));

    // Add new phone or email to the pod
    insertions.push($rdf.st(newSubject, predicate, fieldValue, why));

    // Set the type (defaults to Home/Personal for now) and insert it into the pod as well
    // Todo: Make this dynamic
// tslint:disable-next-line: prefer-const
    let type = field === 'phone' ? $rdf.literal('Home') : $rdf.literal('Personal');
    insertions.push($rdf.st(newSubject, VCARD('type'), type, why));

    // Add a link in #me to the email/phone number (by id)
    insertions.push($rdf.st(me, newPredicate, newSubject, why));
  }

  private getUriForField(field, me): string {
    let uriString: string;
    let uri: any;

    switch (field) {
      case 'phone':
        uriString = this.getValueFromVcard('hasTelephone');
        if (uriString) {
          uri = $rdf.sym(uriString);
        }
        break;
      case 'email':
        uriString = this.getValueFromVcard('hasEmail');
        if (uriString) {
          uri = $rdf.sym(uriString);
        }
        break;
      default:
        uri = me;
        break;
    }

    return uri;
  }

  /**
   * Extracts the value of a field of a NgForm and converts it to a $rdf.NamedNode
   * @param {NgForm} form
   * @param {string} field The name of the field that is going to be extracted from the form
   * @return {RdfNamedNode}
   */
  private getFieldValue(form: NgForm, field: string): any {
    let fieldValue: any;

    if (!form.value[field]) {
      return;
    }

    switch (field) {
      case 'phone':
        fieldValue = $rdf.sym('tel:+' + form.value[field]);
        break;
      case 'email':
        fieldValue = $rdf.sym('mailto:' + form.value[field]);
        break;
      default:
        fieldValue = form.value[field];
        break;
    }

    return fieldValue;
  }

  private getOldFieldValue(field, oldProfile): any {
    let oldValue: any;

    if (!oldProfile || !oldProfile[field]) {
      return;
    }

    switch (field) {
      case 'phone':
        oldValue = $rdf.sym('tel:+' + oldProfile[field]);
        break;
      case 'email':
        oldValue = $rdf.sym('mailto:' + oldProfile[field]);
        break;
      default:
        oldValue = oldProfile[field];
        break;
    }

    return oldValue;
  }

  private getFieldName(field): string {
    switch (field) {
      case 'company':
        return 'organization-name';
      case 'phone':
      case 'email':
        return 'value';
      default:
        return field;
    }
  }

  updateProfile = async (form: NgForm) => {
    const me = $rdf.sym(this.session.webId);
    const doc = $rdf.NamedNode.fromValue(this.session.webId.split('#')[0]);
    const data = this.transformDataForm(form, me, doc);

    // Update existing values
    if (data.insertions.length > 0 || data.deletions.length > 0) {
      this.updateManager.update(data.deletions, data.insertions, (response, success, message) => {
        if (success) {
          this.toastr.success('Your Solid profile has been successfully updated', 'Success!');
          form.form.markAsPristine();
          form.form.markAsTouched();
        } else {
          this.toastr.error('Message: ' + message, 'An error has occurred');
        }
      });
    }
  }

  getAddress = () => {
    const linkedUri = this.getValueFromVcard('hasAddress');

    if (linkedUri) {
      return {
        locality: this.getValueFromVcard('locality', linkedUri),
        country_name: this.getValueFromVcard('country-name', linkedUri),
        region: this.getValueFromVcard('region', linkedUri),
        street: this.getValueFromVcard('street-address', linkedUri),
      };
    }

    return {};
  }

  // Function to get email. This returns only the first email, which is temporary
  getEmail = () => {
    const linkedUri = this.getValueFromVcard('hasEmail');

    if (linkedUri) {
      return this.getValueFromVcard('value', linkedUri).split('mailto:')[1];
    }

    return '';
  }

  // Function to get phone number. This returns only the first phone number, which is temporary. It also ignores the type.
  getPhone = () => {
    const linkedUri = this.getValueFromVcard('hasTelephone');

    if (linkedUri) {
      return this.getValueFromVcard('value', linkedUri).split('tel:+')[1];
    }
  }

  getProfile = async () => {

    if (!this.session) {
      await this.getSession();
    }

    try {
      await this.fetcher.load(this.session.webId);

      return {
        fn : this.getValueFromVcard('fn'),
        company : this.getValueFromVcard('organization-name'),
        phone: this.getPhone(),
        role: this.getValueFromVcard('role'),
        image: this.getValueFromVcard('hasPhoto'),
        address: this.getAddress(),
        email: this.getEmail(),
      };
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  }

  /**
   * Gets any resource that matches the node, using the provided Namespace
   * @param {string} node The name of the predicate to be applied using the provided Namespace
   * @param {$rdf.namespace} namespace The RDF Namespace
   * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
   */
  private getValueFromNamespace(node: string, namespace: any, webId?: string): string | any {
    const store = this.store.any($rdf.sym(webId || this.session.webId), namespace(node));
    if (store) {
      return store.value;
    }
    return '';
  }


  getFriends = async () => {
    this.friends = [];
    if (!this.session) {
      await this.getSession();
    }
    const me = this.session.webId;

    await this.fetcher.load(me);

    const friendList = this.store.each($rdf.sym(me), FOAF('knows'));

    friendList.forEach(async (friend) => {
      await this.fetcher.load(friend);
      const fName = this.store.any(friend, VCARD('fn'));
      const fPic = this.store.any(friend, VCARD('hasPhoto'));
      this.friends.push(new Friend(fName.value, friend.value, fPic.value));
    });
    console.log(this.friends);
    return this.friends;
  }


  /* ALL THE FOLLOWING METHODS ARE TO BE IMPLEMENTED. FURTHER DISCUSSION REGARDING THE
     ORGANIZATION OF CHATS INTO SEPARATE FOLDERS WITH SPECIFIC PERMISSIONS FOR THE PARTICIPANTS
     IS NEEDED*/


  togleNewChatFriend = (f: Friend) => {
    for (let i = 0; i < this.newChatFriends.length; i++) {
      if (this.newChatFriends[i] === f.webId) {
        this.newChatFriends.splice(i, 1);
        console.log(this.newChatFriends);
        return;
      }
    }
    this.newChatFriends.push(f.webId);
    console.log(this.newChatFriends);
  }

  /**
   * Defines a new chat in the pod. The chat needs a name and a list of
   * participants (weIds, not names). The list can contain one or many
   * participants. Duplicate names must no be possible.
   * Once the usser creates a chat, the participants should be notified.
   */
  addChat = async (chatName) => {
    if (!this.session) {
      await this.getSession();
    }
    const chatCreator = this.session.webId;
    await this.fetcher.load(chatCreator);
    const chat = new Chat(chatName, chatCreator, this.newChatFriends, null, null);
    // This is what must be uploaded to the pods of creator and friends.
    const chatJson = chat.serialize();

// tslint:disable-next-line: fori
    console.log(this.newChatFriends);
    this.newChatFriends.forEach( i => {
      this.toastr.success(i);
      const storein = i.replace('profile/card#me', '');
      const urlJsonChat = storein + 'public/dechat3b/chats/';
      const urlFolderChat = storein + 'public/dechat3b/' + chat.id;

      fileClient.createFolder(urlFolderChat).then(success => {
        console.log(`Created folder ${urlFolderChat}.`);
      }, error => console.log(error) );

      fileClient.updateFile(urlJsonChat + chat.id + '.json', chatJson).then( fileCreated => {
        console.log(`Created file ${fileCreated}.`);
        this.toastr.success(`Created file ${fileCreated}.`);
      }, err => console.error(err) );
    });
  }

  /**
   * Method to create the folders needed to store the files in the POD.
   * It's one of the first things we need to do when starting the app.
   */
  createFolders = async() => {
    if (!this.session) {
       await this.getSession();
    }
    const url = this.session.webId.replace('profile/card#me', 'public/dechat3b/');
      fileClient.createFolder(url).then(success => {
        console.log(`Created folder ${url}.`);
      }, error => console.log(error) );
      fileClient.createFolder(url + '/chats').then(success => {
        console.log(`Created folder ${url + '/chats'}.`);
      }, error => console.log(error) );
      fileClient.createFolder(url + '/notifications').then(success => {
        console.log(`Created folder ${url + '/notifications'}.`);
      }, error => console.log(error) );
  }

  getChats = async() => {
    if (!this.session) {
      await this.getSession();
    }
    const folderName = this.session.webId.replace('profile/card#me', 'public/dechat3b/chats');
    fileClient.readFolder(folderName).then(folder => {
      console.log(`Read ${folder.name}, it has ${folder.files.length} files.`);
      folder.files.forEach(
          f => fileClient.readFile(folderName + '/' + f.name).then(
              body => {
                const chat = Chat.fromJson(body);
                this.chats.push(chat);
                this.getMessagesForChat(chat);
              }));
    }, err => console.log(err) );
  }

  /**
   * This method gets all the messages belonging to a certain chat. Ideally it returns them
   * already formated and sorted by date.
   */
  getMessagesForChat = async (chat) => {
    const aux: Message[] = [];
    if (!this.session) {
      await this.getSession();
    }
    let folderName = this.session.webId.replace('profile/card#me', 'public/dechat3b/');
    folderName += chat.id;
    fileClient.readFolder(folderName).then(folder => {
      folder.files.forEach(
        f => fileClient.readFile(folderName + '/' + f.name).then(
          body => aux.push(Message.fromJson(body))
        )
      );
    });
    aux.sort( function (a, b)  {
      return a.date.getTime() - b.date.getTime();
    });
    chat.messages = aux;
  }


  /**
   * This method must be put in a loop to check for updates in the notifications folder.
   * If a new file is detected, then the message is pusshed to corresponding chat messages array.
   * The chat id is used to check the value.
   */
  readNotifications = async () => {
    const aux: Message[] = [];
    if (!this.session) {
      await this.getSession();
    }
    const folderName = this.session.webId.replace('profile/card#me', 'public/dechat3b/notifications');
    fileClient.readFolder(folderName).then(folder => {
      folder.files.forEach(
        f => fileClient.readFile(folderName + '/' + f.name).then(
          body => {
            const m: Message = Message.fromJson(body);
            this.chats.forEach( c => {
              if (m.chat === c.id) {
                c.messages.push(m);
                fileClient.delete( folderName + '/' + f.name ).then( response => {
                  console.log( folderName + '/' + f.name + 'successfully deleted' );
                }, err => console.log(folderName + '/' + f.name + ' not deleted : ' + err) );
              }
            });
          })
      );
    });
  }

  /**
   * Adds a message to a chat. This method depends on the current selectedChat value.
   * Creates 2 files in all the chat targets, one in notifications and one in the chat folder.
   * The message id must be generated here, as well as the date.
   */
  writeMessage = async (content: string) => {
    if ( ! this.selectedChat) { return; }
    const date = new Date();
    const chat = this.selectedChat.name;
    const profile = await this.getProfile();
    const author = this.session.webId;
    const id = chat + profile.fn + date.getTime();
    const mess = new Message(id, chat, author, date, content);
    const messJson = mess.serialize();
    const targets = this.selectedChat.participants;

// tslint:disable-next-line: forin
    for (const f in targets) {
      let url = f.replace('profile/card#me',
        'public/dechat3b/' + this.selectedChat.id + '/' + mess.id + '.json');

      fileClient.updateFile(url, messJson).then( fileCreated => {
        console.log(`Created file ${fileCreated}.`);
      }, err => console.error(err));

      if (f !== this.session.webId) {
        url = f.replace('profile/card#me', 'public/dechat3b/notifications/' + mess.id + '.json');
        fileClient.updateFile(url, messJson).then( fileCreated => {
          console.log(`Created file ${fileCreated}.`);
        }, err => console.error(err));
      }
    }
  }

}
