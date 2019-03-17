import { Component, Input } from '@angular/core';
import { ChatRoom } from './chatroom.model';

@Component({
    selector: 'app-chatroom',
    templateUrl: './chatroom.component.html',
    styleUrls: ['./chatroom.component.css']
})
export class ChatRoomComponent {

    @Input() chatroom: ChatRoom;

}
