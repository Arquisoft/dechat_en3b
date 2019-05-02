import { Component, OnInit, Input } from '@angular/core';

// Model
import { Chat } from '../models/chat.model';
import { RdfService } from '../services/rdf.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor( private rdf: RdfService) {}

  @Input() chat: Chat;

  onSelect(): void {
    this.rdf.changeSelectedChat(this.chat);
  }

}
