import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/solid.auth.service';

@Component({
    selector: 'app-navigator-options',
    templateUrl: './navigator-options.component.html',
    styleUrls: ['./navigator-options.component.css']
})
export class NavigatorOptionsComponent {

    constructor(private auth: AuthService) {}

    logout() {
        this.auth.solidSignOut();
      }

}
