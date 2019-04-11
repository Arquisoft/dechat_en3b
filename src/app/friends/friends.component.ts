import { Component, OnInit } from '@angular/core';
import { RdfService } from '../services/rdf.service';
import { Friend } from '../models/friend.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: Friend[];

  constructor(private rdf: RdfService) {}

  ngOnInit() {
    this.rdf.getFriends().then(friends => this.friends = friends);
  }

}
