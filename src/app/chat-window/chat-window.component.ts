import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolidProfile } from '../models/solid-profile.model';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';

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

  ngOnInit() {
    this.loadingProfile = true;
    this.loadProfile();

    this.rdf.getFriends();
<<<<<<< HEAD
    // friends.then(th => this.rdf.addChat('testChat', th));
    
=======

    this.rdf.createFolders();

    this.rdf.getChats();
>>>>>>> master
  }

}
