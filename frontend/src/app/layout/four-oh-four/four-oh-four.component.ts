/**
* @file Displaying the 404 page.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-four-oh-four',
  templateUrl: './four-oh-four.component.html',
  styleUrls: ['./four-oh-four.component.scss']
})

export class FourOhFourComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Divergence - erreur 404');
  }

  ngOnInit(): void { }

  /*--------------------------------------------------------------------*/
}
