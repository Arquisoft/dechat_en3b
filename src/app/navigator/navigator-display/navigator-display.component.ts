import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { RdfService } from 'src/app/services/rdf.service';

@Component({
    selector: 'app-navigator-display',
    templateUrl: './navigator-display.component.html',
    styleUrls: ['./navigator-display.component.css']
})
export class NavigatorDisplayComponent {

    contacts: Contact[];
    selectedContact: Contact;

    constructor(private contactService: ContactService, private rdf: RdfService) {
        // this.contacts = contactService.getContacts();
        rdf.getFriends().then(result => this.contacts = result);
    }

}
