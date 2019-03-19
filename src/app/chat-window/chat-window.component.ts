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
    $('#contactsList').children().toggleClass('selectedContact', false);
    $(this).toggleClass('selectedContact');
  }

  clearBar() {
    $(this).val('');
  }

  ngOnInit() {
    $('#contactsList').children().on('click', this.select);
    $('input:text').on('focus', this.clearBar);
  }

}
