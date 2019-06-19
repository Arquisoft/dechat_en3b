import { Component } from '@angular/core';
import { RdfService } from '../../services/rdf.service';

@Component({
    selector: 'app-chatmessages-input',
    templateUrl: './chatmessages-input.component.html',
    styleUrls: ['./chatmessages-input.component.css']
})
export class ChatMessagesInputComponent {

    constructor (private rdf: RdfService) {}

    keyPressed(e){
        if(e.key == 'Enter'){
        this.writeMessage();
        }
    }

    writeMessage() {
        const input = <HTMLInputElement> document.getElementById('messageContent');
        const messageContent = input.value;
        console.log('Button clicket, atempt to write message content: ' + messageContent);
        this.rdf.writeMessage(messageContent);
        input.value = '';
    }
}
