import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/solid.auth.service';
import { ChatWindowComponent } from 'src/app/chat-window/chat-window.component';

@Component({
    selector: 'app-navigator-options',
    templateUrl: './navigator-options.component.html',
    styleUrls: ['./navigator-options.component.css']
})
export class NavigatorOptionsComponent {

    chatComponent: ChatWindowComponent;

    constructor(private auth: AuthService, chat: ChatWindowComponent) {
        this.chatComponent = chat;
    }

    logout() {
        this.auth.solidSignOut();
    }

    loadPicture() {
        if (this.chatComponent.profile) {
            if (this.chatComponent.profile.image) {
              this.chatComponent.profileImage = this.chatComponent.profile.image;
              return '' + this.chatComponent.profileImage;
            }
        }
        return '/assets/images/profile.png';
    }

}
