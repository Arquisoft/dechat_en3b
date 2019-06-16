import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { currentSession } from 'solid-auth-client';

// Services
import { AuthService } from '../services/solid.auth.service';
import { RdfService } from '../services/rdf.service';

class Session {
  constructor() {}

  webId: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  session: Session = new Session();

  constructor(private rdf: RdfService, private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  onSignOut = () => {
    window.clearInterval(this.rdf.notificationsID);
    this.auth.solidSignOut();
  }

}
