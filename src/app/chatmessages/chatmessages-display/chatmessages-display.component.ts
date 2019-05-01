import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';
import { RdfService } from '../../services/rdf.service';

@Component({
    selector: 'app-chatmessages-display',
    templateUrl: './chatmessages-display.component.html',
    styleUrls: ['./chatmessages-display.component.css']
})
export class ChatMessagesDisplayComponent implements OnInit {

    messages: Message[];

    constructor(private rdf: RdfService) {}

    ngOnInit() {
        // Aqui habria que cargar los mensajes de la conversacion en la lista
        // De momento pongo algunos a mano

        this.messages = [
        ];
    }

    isMyMessage(message: Message): boolean {
        return this.rdf.session.webId === message.author;
    }

}
