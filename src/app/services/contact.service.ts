import { Inject, Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactComponent } from '../contact/contact.component';
declare let $rdf: any;
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    mockContacts: Contact[] = [
        {name: 'Friend1'},
        {name: 'Friend2'},
        {name: 'Friend3'},
        {name: 'Friend4'},
        {name: 'Friend5'},
        {name: 'Friend6'},
        {name: 'Friend7'},
        {name: 'EasterEgg'},
        {name: 'Tim'},
        {name: 'Mitzi'},
        {name: 'Labra'}
    ];

    contacts: Contact[] = [];

    getContacts(): Contact[] {
        if(typeof this.contacts == 'undefined' || this.contacts.length == 0)
            this.parseContacts();
        return this.contacts;
        //return this.mockContacts;
    }

    async parseContacts(): Promise<void>{
        /** 
         // Set up a local data store and associated data fetcher
        const store = $rdf.graph();
        const fetcher = new $rdf.Fetcher(store);

        // Load the person's data into the store
        const person = $('#profile').val();
        await fetcher.load(person);

        //Fetch their names
        const fullName = store.any($rdf.sym(person), FOAF('name'));
        $('#fullName').text(fullName && fullName.value);

        //Fill friend list
        const friends = store.each($rdf.sym(person), FOAF('knows'));
        $('#friends').empty();
        friends.forEach(async (friend) => {
        await fetcher.load(friend);
        const fullName = store.any(friend, FOAF('name'));
        
        //???
        this.contacts.push(fullName);

        //$('#friends').append($('<li>')
        //.text(fullName && fullName.value || friend.value));
        });
        */

        //test - dynamic push 
        for(var i = 0; i<6; i++){
            var conName = i.toString();
            this.contacts.push({name: conName});
        }

    }
        
}
