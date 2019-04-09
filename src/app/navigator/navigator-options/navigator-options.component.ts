import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/solid.auth.service';
import { ChatWindowComponent } from 'src/app/chat-window/chat-window.component';

@Component({
    selector: 'app-navigator-options',
    templateUrl: './navigator-options.component.html',
    styleUrls: ['./navigator-options.component.css']
})
export class NavigatorOptionsComponent {

    chat: ChatWindowComponent;

    constructor(private auth: AuthService, chat: ChatWindowComponent) {
        this.chat = chat;
    }

    logout() {
        this.auth.solidSignOut();
    }

    loadPicture() {
        if (this.chat.profile) {
            if (this.chat.profile.image) {
              this.chat.profileImage = this.chat.profile.image;
              return '' + this.chat.profileImage;
            }
        }
        return '/assets/images/profile.png';
    }

}
