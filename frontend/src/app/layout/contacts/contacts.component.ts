/**
* @file Management of the user's contact display.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Profile_public } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

  profiles: Profile_public[] = [];

  constructor(private profilesService: ProfileService, 
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Groupomania - Liste des contacts');
  }

  ngOnInit(): void {
    this.profilesService.getProfiles().subscribe((data) => {
      this.profiles = data;
    });
  }

  /*--------------------------------------------------------------------*/

  /** 
  * (function to come, pending) Will redirect to a dedicated profile page or to a sub-component.
  * @param {number} id - Identifies the position of the contact in the display loop.
  */
  onViewProfile(id: number): void {
    // this.router.navigate(['/profile', 'view', id]) créer le component de vue unique ou rediriger vers profile?
  }

}
