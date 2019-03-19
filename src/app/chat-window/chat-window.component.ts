import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  constructor() { }

  select() {
    $('#chatsList').children().toggleClass('selectedChatElement', false);
    $(this).toggleClass('selectedChatElement');
  }

  ngOnInit() {
    $('#chatsList').children().on('click', this.select);
  }

}
