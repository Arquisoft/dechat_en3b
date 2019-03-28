import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(imgSrc: '/assets/images/profile.png', name: 'DefaultName') {
    if (imgSrc === '/assets/images/profile.png' || imgSrc === null) {

    }
  }

  ngOnInit() {
  }

}
