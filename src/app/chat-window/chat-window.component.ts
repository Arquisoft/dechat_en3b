import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SolidProfile } from '../models/solid-profile.model';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  constructor(private rdf: RdfService,
    private route: ActivatedRoute) { }

  select() {
    $('#chatsList').children().toggleClass('selectedChatElement', false);
    $(this).toggleClass('selectedChatElement');
  }

  ngOnInit() {
    $('#chatsList').children().on('click', this.select);
  }

}
