import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
    selector: 'app-navigator-display',
    templateUrl: './navigator-display.component.html',
    styleUrls: ['./navigator-display.component.css']
})
export class NavigatorDisplayComponent {

    contacts: Contact[];
    selectedContact: Contact;

    constructor(private contactService: ContactService) {
        this.contacts = contactService.getContacts();
    }

}
