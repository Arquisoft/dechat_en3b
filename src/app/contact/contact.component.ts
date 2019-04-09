import { Component, OnInit, Input } from '@angular/core';

// Model
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() contact: Contact;
  selected = false;

  onSelect(): void {
    this.selected = !this.selected;
  }

  loadPicture() {
    return this.contact.pic ? this.contact.pic : '/assets/images/profile.png';
  }



}
