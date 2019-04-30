import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { RdfService } from 'src/app/services/rdf.service';

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
            {
                id: '1',
                chat: '33',
                author: 'https://dechaten3b1.solid.community/profile/card#me',
                date: Date.now(),
                content: 'Primer mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'elotro',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'https://dechaten3b1.solid.community/profile/card#me',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'elotro',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'https://dechaten3b1.solid.community/profile/card#me',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'elotro',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'https://dechaten3b1.solid.community/profile/card#me',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'elotro',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'https://dechaten3b1.solid.community/profile/card#me',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'elotro',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'https://dechaten3b1.solid.community/profile/card#me',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
            {
                id: '2',
                chat: '34',
                author: 'elotro',
                date: Date.now(),
                content: 'Otro mensaje dinamico'
            },
        ];
    }

    isMyMessage(message: Message): boolean {
        return this.rdf.session.webId === message.author;
    }

}
