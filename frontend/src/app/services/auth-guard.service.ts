/**
* @file Management of canActivate to protect access to the application's routes.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  /*--------------------------------------------------------------------*/

  /** 
  * Protects roads from unauthorised access.
  * @param {ActivatedRouteSnapshot} route - Angular module parameters.
  * @param {RouterStateSnapshot} state - Angular module parameters.
  * @return {boolean} Returns true if the user is authenticated.
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    // Access control
    if(!this.authService.isConnected()) {
      console.log('accès non autorisé !')
      this.authService.signOutUser();
      this.router.navigate(['signin']);
      return false;
    }

    return true;
  }

}
