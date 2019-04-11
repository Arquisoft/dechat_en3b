import { Component, Input } from '@angular/core';
import { Friend } from '../models/friend.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {

  @Input() friend: Friend;
  selected = false;

  onSelect(): void {
    this.selected = !this.selected;
  }

}
