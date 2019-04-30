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
    if (this.rdf.friends.length === 0) {
      this.rdf.getFriends().then(f => this.friends = f);
      return;
    }
    this.friends = this.rdf.friends;
  }

  createChat() {
    const input = <HTMLInputElement> document.getElementById('chatName');
    const chatName = input.value;
    this.rdf.addChat(chatName);
  }

}
