import { Component } from '@angular/core';
import { RdfService } from '../services/rdf.service';

@Component({
    selector: 'app-chatmessages',
    templateUrl: './chatmessages.component.html',
    styleUrls: ['./chatmessages.component.css']
})
export class ChatMessagesComponent {

    constructor(private rdf: RdfService) {}

}
