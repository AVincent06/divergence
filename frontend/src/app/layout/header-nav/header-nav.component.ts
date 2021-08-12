/**
* @file Management of the login/logout menu and the display of all site pages within its structure.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})

export class HeaderNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isLoggedIn: boolean = false; 

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private router: Router) {
    this.authService.isUserLoggedIn().subscribe((isLog: boolean) => this.isLoggedIn = isLog); // code pour l'observable de la session
  }

  /*--------------------------------------------------------------------*/

  /** 
  * Redirects to the logout page after deleting the sessionStorage.
  */
  signout(): void {
    this.authService.signOutUser();
    this.router.navigate(['signout']);
  }

}
