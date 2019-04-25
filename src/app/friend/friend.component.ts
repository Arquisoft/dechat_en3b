import { Component, Input } from '@angular/core';
import { Friend } from '../models/friend.model';
import { RdfService } from '../services/rdf.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {

  @Input() friend: Friend;
  selected = false;

  constructor(private rdf: RdfService) {}

  onSelect(): void {
    this.selected = ! this.selected;
    this.rdf.togleNewChatFriend(this.friend);
  }

}
