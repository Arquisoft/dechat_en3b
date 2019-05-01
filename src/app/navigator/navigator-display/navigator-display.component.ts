import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Chat } from '../../models/chat.model';
import { RdfService } from '../../services/rdf.service';

@Component({
    selector: 'app-navigator-display',
    templateUrl: './navigator-display.component.html',
    styleUrls: ['./navigator-display.component.css']
})
export class NavigatorDisplayComponent implements OnInit {

    chats: Chat[];
    selectedChat: Chat;

    constructor(private contactService: ContactService, private rdf: RdfService) {}

    ngOnInit () {
        // Aqui se deberian cargar los contactos
        this.rdf.getChats();
        this.chats = this.rdf.chats;
    }

}
