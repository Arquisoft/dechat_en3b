import { Inject, Injectable } from '@angular/core';
import { Contact } from './contact.model';

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

    getContacts(): Contact[] {
        return this.mockContacts;
    }

}
