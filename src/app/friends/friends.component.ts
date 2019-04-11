import { Component } from '@angular/core';
import { RdfService } from '../services/rdf.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {

  constructor(private rdf: RdfService) {}

}
