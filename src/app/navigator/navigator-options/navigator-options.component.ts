import { Component } from '@angular/core';
import { AuthService } from '../../services/solid.auth.service';
import { ChatWindowComponent } from '../../chat-window/chat-window.component';
import { RdfService } from '../../services/rdf.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigator-options',
    templateUrl: './navigator-options.component.html',
    styleUrls: ['./navigator-options.component.css']
})
export class NavigatorOptionsComponent {

    chatComponent: ChatWindowComponent;

    constructor(private auth: AuthService, private rdf: RdfService, chat: ChatWindowComponent, private router: Router) {
        this.chatComponent = chat;
    }

    logout() {
        window.clearInterval(this.rdf.notificationsID);
        this.auth.solidSignOut();
        this.router.navigateByUrl('/login');
    }

    loadPicture() {
        if (this.chatComponent.profile) {
            if (this.chatComponent.profile.image) {
              this.chatComponent.profileImage = this.chatComponent.profile.image;
              return '' + this.chatComponent.profileImage;
            }
        }
        return 'assets/images/profile.png';
    }

    loadName(){
        if (this.chatComponent.profile) {
            if (this.chatComponent.profile.fn) {
              return '' + this.chatComponent.profile.fn;
            }
        }
        return 'Unidentified';
    }

    async resetSelectedFriendList() {
        this.rdf.resetSelectedFriends();
    }

    filter() {
    const input = <HTMLInputElement> document.getElementById('filterForContacts');
    const str = input.value;
    this.rdf.filterChat(str);
    }

}
