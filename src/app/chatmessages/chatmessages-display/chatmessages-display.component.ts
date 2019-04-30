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
            new Message('1', '33', 'https://dechaten3b1.solid.community/profile/card#me', new Date(), 'Primer mensaje Dinámico'),
            new Message('2', '33', 'otro', new Date(), '2 mensaje Dinámico'),
            new Message('3', '33', 'https://dechaten3b1.solid.community/profile/card#me', new Date(), '3 mensaje Dinámico'),
            new Message('4', '33', 'otro', new Date(), '4 mensaje Dinámico'),
            new Message('5', '34', 'https://dechaten3b1.solid.community/profile/card#me', new Date(), '5 mensaje Dinámico'),
            new Message('6', '34', 'https://dechaten3b1.solid.community/profile/card#me', new Date(), '6 mensaje Dinámico'),
            new Message('7', '34', 'otro', new Date(), '7 mensaje Dinámico'),
            new Message('8', '34', 'otro', new Date(), '8 mensaje Dinámico'),
            new Message('9', '34', 'https://dechaten3b1.solid.community/profile/card#me', new Date(), '9 mensaje Dinámico')
        ];
    }

    isMyMessage(message: Message): boolean {
        return this.rdf.session.webId === message.author;
    }

}
