import { Injectable } from '@angular/core';
import { SolidSession } from '../models/solid-session.model';
declare let solid: any;
declare let $rdf: any;
//import * as $rdf from 'rdflib'

// TODO: Remove any UI interaction from this service
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from './contact.service';
import { first } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Contact } from '../models/contact.model';
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
  };

  /**
   * Gets a node that matches the specified pattern using the FOAF onthology
   * @param {string} node FOAF predicate to apply to the $rdf.any()
   * @param {string?} webId The webId URL (e.g. https://yourpod.solid.community/profile/card#me)
   * @return {string} The value of the fetched node or an emtpty string
   */
  getValueFromFoaf = (node: string, webId?: string) => {
    return this.getValueFromNamespace(node, FOAF, webId);
  };
 
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

      let predicate = VCARD(this.getFieldName(field));
      let subject = this.getUriForField(field, me);
      let why = doc;

      let fieldValue = this.getFieldValue(form, field);
      let oldFieldValue = this.getOldFieldValue(field, oldProfileData);

      // if there's no existing home phone number or email address, we need to add one, then add the link for hasTelephone or hasEmail
      if(!oldFieldValue && fieldValue && (field === 'phone' || field==='email')) {
        this.addNewLinkedField(field, insertions, predicate, fieldValue, why, me);
      } else {

        //Add a value to be updated
        if (oldProfileData[field] && form.value[field] && !form.controls[field].pristine) {
          deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
          insertions.push($rdf.st(subject, predicate, fieldValue, why));
        }

        //Add a value to be deleted
        else if (oldProfileData[field] && !form.value[field] && !form.controls[field].pristine) {
          deletions.push($rdf.st(subject, predicate, oldFieldValue, why));
        }

        //Add a value to be inserted
        else if (!oldProfileData[field] && form.value[field] && !form.controls[field].pristine) {
          insertions.push($rdf.st(subject, predicate, fieldValue, why));
        }
      }
    });

    return {
      insertions: insertions,
      deletions: deletions
    };
  };

  private addNewLinkedField(field, insertions, predicate, fieldValue, why, me: any) {
    //Generate a new ID. This id can be anything but needs to be unique.
    let newId = field + ':' + Date.now();

    //Get a new subject, using the new ID
    let newSubject = $rdf.sym(this.session.webId.split('#')[0] + '#' + newId);

    //Set new predicate, based on email or phone fields
    let newPredicate = field === 'phone' ? $rdf.sym(VCARD('hasTelephone')) : $rdf.sym(VCARD('hasEmail'));

    //Add new phone or email to the pod
    insertions.push($rdf.st(newSubject, predicate, fieldValue, why));

    //Set the type (defaults to Home/Personal for now) and insert it into the pod as well
    //Todo: Make this dynamic
    let type = field === 'phone' ? $rdf.literal('Home') : $rdf.literal('Personal');
    insertions.push($rdf.st(newSubject, VCARD('type'), type, why));

    //Add a link in #me to the email/phone number (by id)
    insertions.push($rdf.st(me, newPredicate, newSubject, why));
  }

  private getUriForField(field, me): string {
    let uriString: string;
    let uri: any;

    switch(field) {
      case 'phone':
        uriString = this.getValueFromVcard('hasTelephone');
        if(uriString) {
          uri = $rdf.sym(uriString);
        }
        break;
      case 'email':
        uriString = this.getValueFromVcard('hasEmail');
        if(uriString) {
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

    if(!form.value[field]) {
      return;
    }

    switch(field) {
      case 'phone':
        fieldValue = $rdf.sym('tel:+'+form.value[field]);
        break;
      case 'email':
        fieldValue = $rdf.sym('mailto:'+form.value[field]);
        break;
      default:
        fieldValue = form.value[field];
        break;
    }

    return fieldValue;
  }

  private getOldFieldValue(field, oldProfile): any {
    let oldValue: any;

    if(!oldProfile || !oldProfile[field]) {
      return;
    }

    switch(field) {
      case 'phone':
        oldValue = $rdf.sym('tel:+'+oldProfile[field]);
        break;
      case 'email':
        oldValue = $rdf.sym('mailto:'+oldProfile[field]);
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

    //Update existing values
    if(data.insertions.length > 0 || data.deletions.length > 0) {
      this.updateManager.update(data.deletions, data.insertions, (response, success, message) => {
        if(success) {
          this.toastr.success('Your Solid profile has been successfully updated', 'Success!');
          form.form.markAsPristine();
          form.form.markAsTouched();
        } else {
          this.toastr.error('Message: '+ message, 'An error has occurred');
        }
      });
    }
  };

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
  };

  //Function to get email. This returns only the first email, which is temporary
  getEmail = () => {
    const linkedUri = this.getValueFromVcard('hasEmail');

    if (linkedUri) {
      return this.getValueFromVcard('value', linkedUri).split('mailto:')[1];
    }

    return '';
  }

  //Function to get phone number. This returns only the first phone number, which is temporary. It also ignores the type.
  getPhone = () => {
    const linkedUri = this.getValueFromVcard('hasTelephone');

    if(linkedUri) {
      return this.getValueFromVcard('value', linkedUri).split('tel:+')[1];
    }
  };

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
  };

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
    for (let i = 0; i < this.newChatFriends.length; i++){
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
  addChat = async (chatName, participants: string[]) => {
    if (!this.session) {
      await this.getSession();
    }
    
    const chatCreator = this.session.webId; 
    await this.fetcher.load(chatCreator);
    const chat = new Chat(chatName, chatCreator, participants, null, null);
    // This is what must be uploaded to the pods of creator and friends.
    const chatJson = chat.serialize();

   
      var storein = chatCreator.replace("profile/card#me", ""); //es una gochada
      fileClient.createFile(storein+"public/dechat3b/" 
      + chatName + ".json", chatJson).then( fileCreated => {
        console.log(`Created file ${fileCreated}.`);
        this.toastr.success(`Created file ${fileCreated}.`);
      }, err => console.error(err) );
    
   
    


    const ins = [];
    // ins.push($rdf.st(me, FOAF('holdsAccount'), chatName, 'me'));
    // participants.forEach(f => ins.push($rdf.st(chatName, FOAF('member'), f)));
    // Gives error, must specify document to store data.
    this.updateManager.update(null, ins, (response, success, message) => {
      if(success) {
        this.toastr.success('New chat added', 'Success!');
      } else {
        this.toastr.error('Message: ' + message, 'An error has occurred');
      }
    });

  }

  /**
   * Method to create the folders needed to store the files in the POD.
   * It's one of the first things we need to do when starting the app.
   */
  createFolders = async() => {
    var storein = this.session.webId.replace("profile/card#me", "");
    var url = storein+"public/dechat3b/";
    fileClient.createFolder(url).then(success => {
      console.log(`Created folder ${url}.`);
      this.toastr.success(`Created folder ${url}.`);
    }, err => console.log(err) );
    fileClient.createFolder(url+"/chats").then(success => {
      console.log(`Created folder ${url+"/chats"}.`);
      this.toastr.success(`Created folder ${url+"/chats"}.`);
    }, err => console.log(err) );


  }

  /**
   * Adds a new participant to a chat
   */
  addChatParticipant = async (chatName, participantId) => {

  }

  /**
   * Adds a message to a chat. This method uses the getChatParticipants
   * and creates one statement for each of them to be posted in their pods.
   * The message id must be generated here.
   */
  addMessageToChat = async (chatName, message) => {

  }

  /**
   * Returns a statement(s) ready to be pushed using the update manager.
   * The message has:
   *    - A source (the logged usser webId)
   *    - A target (the webId of the person in which it is going to be stored)
   *    - A text (the message itself)
   *    - A chat name (to which belongs. This will be used to filter messages for the UI)
   *    - An id created with the author's name, the chat name and the current time
   *    - The date of the creation of the message
   */
  createMessageSt = (target, text, chatName, id) => {

  }

  /**
   * This method returns a list of the webId's corresponding 
   * to the participants of the chat.
   */
  getChatParticipants = async (chatName) => {

  }

  /**
   * This method gets all the messages belonging to a certain chat. Ideally it returns them
   * already formated and sorted by date.
   */
  getMessagesForChat = async (chatName) => {

  }

}
