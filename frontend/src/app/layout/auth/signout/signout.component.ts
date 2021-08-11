import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Groupomania - A bientôt !');
  }

  ngOnInit(): void { }

}
