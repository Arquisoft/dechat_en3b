import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message.model';
import { RdfService } from '../../services/rdf.service';

@Component({
    selector: 'app-chatmessages-display',
    templateUrl: './chatmessages-display.component.html',
    styleUrls: ['./chatmessages-display.component.css']
})
export class ChatMessagesDisplayComponent implements OnInit {

    messages: Message[];

    constructor(private rdf: RdfService) { this.rdf.setDisplay(this);}

    ngOnInit() {
    }

    isMyMessage(message: Message): boolean {
        return this.rdf.session.webId === message.author;
    }

    updateStuff() {
        console.log('UpdateStuff');
    }

}
