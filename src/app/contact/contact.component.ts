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

  //constructor(name: any){ this.contact.name = name}

}
