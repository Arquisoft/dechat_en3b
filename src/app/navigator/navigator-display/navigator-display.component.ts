import { Component } from '@angular/core';
import { ContactService } from 'src/app/contact/contact.service';
import { Contact } from 'src/app/contact/contact.model';

@Component({
    selector: 'app-navigator-display',
    templateUrl: './navigator-display.component.html',
    styleUrls: ['./navigator-display.component.css']
})
export class NavigatorDisplayComponent {

    contacts: Contact[];

    constructor(private contactService: ContactService) {
        this.contacts = contactService.getContacts();
    }

}
