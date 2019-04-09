import { Inject, Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactComponent } from '../contact/contact.component';
import { SolidProfile } from '../models/solid-profile.model';
declare let $rdf: any;
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    mockContacts: Contact[] = [
        {name: 'Friend1', pic: ''},
        {name: 'Friend2', pic: ''},
        {name: 'Friend3', pic: ''},
        {name: 'Friend4', pic: ''},
        {name: 'Friend5', pic: ''},
        {name: 'Friend6', pic: ''},
        {name: 'Friend7', pic: ''},
        {name: 'EasterEgg', pic: ''},
        {name: 'Tim', pic: ''},
        {name: 'Mitzi', pic: ''},
        {name: 'Labra', pic: ''}
    ];

    contacts: Contact[] = [];
/*
    getContacts(): Contact[] {
        if (typeof this.contacts === 'undefined' || this.contacts.length === 0) {
            this.parseContacts();
        }
        return this.contacts;
        //return this.mockContacts;
    }
    */

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
        let conName;
        for(let i = 0; i < 6; i++) {
            conName = i.toString();
            this.contacts.push({name: conName, pic: ''});
        }

    }
        
}
