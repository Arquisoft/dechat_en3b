import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolidProfile } from '../models/solid-profile.model';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';
import { Session } from 'protractor';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  loadingProfile: Boolean;
  profile: SolidProfile;
  profileImage: String;

  constructor(private rdf: RdfService, private auth: AuthService,
    private route: ActivatedRoute, private router: Router) { }

  async loadProfile() {
    try {
      this.loadingProfile = true;
      const profile = await this.rdf.getProfile();
      if (profile) {
        this.profile = profile;
        this.auth.saveOldUserData(profile);
      }
      this.loadingProfile = false;
      if (!this.auth.session) {
        this.router.navigateByUrl('/login');
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.auth.solidSignOut();
    this.router.navigateByUrl('/login');
  }


  select() {
   /*  $('#contactsList').children().toggleClass('selectedContact', false);
    $(this).toggleClass('selectedContact'); */
  }

  loadMessages() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    /* let chat = $('#messageList')[0];
    chat.scrollTop = chat.scrollHeight; */
  }

  clearBar() {
    // $(this).val('');
  }


  ngOnInit() {
    /* $('#contactsList').children().attr('tabindex', '0');
    $('#contactsList').children().on('focus', this.select);
    $('#contactsList').children().on('focus', this.loadMessages.bind(this));
    $('input:text').on('focus', this.clearBar);
    $('#button2').on('click', this.logout); */
    this.loadingProfile = true;
    this.loadProfile();
    const friends = this.rdf.getFriends();
    // friends.then(th => this.rdf.addChat('testChat', th));
  }

}
