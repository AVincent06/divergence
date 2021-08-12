/**
* @file Component for the management of forgotten passwords with email server to contact the user.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
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
