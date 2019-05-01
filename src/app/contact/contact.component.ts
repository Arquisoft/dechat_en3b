import { Component, OnInit, Input } from '@angular/core';

// Model
import { Chat } from '../models/chat.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() chat: Chat;
  selected = false;

  onSelect(): void {
    this.selected = !this.selected;
  }

}
