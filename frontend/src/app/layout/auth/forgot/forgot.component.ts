import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Groupomania - Problème de mot de passe ?');
  }

  ngOnInit(): void { }

}
