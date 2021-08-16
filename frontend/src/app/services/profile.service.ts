/**
* @file Services grouping all functions related to the management of user profiles.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile_private, Profile_public, Profile_public2 } from '../models/profile.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  /*--------------------------------------------------------------------*/

  /**
  * Request to the REST API to delete a profile to a target id.
  * @param {number} id - the profile's id in its table.
  * @return {Observable<any>} Type of observable according to the response received.
  */
  delSingleProfile(id: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_BACKEND}/api/users/${id}`,  
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        }) 
      }
    );
  }

  /** 
  * Request to the REST API to get all of registered users.
  * @return {Observable<Profile_public[]>} Observable of type Profile_public[] declared in profile.model.ts
  */
  getProfiles(): Observable<Profile_public[]> {
    return this.http.get<Profile_public[]>(
      `${environment.URL_BACKEND}/api/users`,  
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        }) 
      }
    );
  }

  /** 
  * Request to the REST API to get a profile to a target id.
  * @param {number} id - the profile's id in its table.
  * @return {Observable<Profile_private>} Observable of type Profile_private declared in profile.model.ts
  */
  getSingleProfile(id: number): Observable<Profile_private> {
    return this.http.get<Profile_private>(
      `${environment.URL_BACKEND}/api/users/${id}`,  
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken()
        }) 
      }
    );
  }

  /** 
  * Request to the REST API to update the profile of the logged-in user.
  * @param {number} id - The profile's id in its table.
  * @param {Profile_public2} profile - Object of type Profile_public2 declared in profile.model.ts
  * @return {Observable<any>} Type of observable according to the response received.
  */
  setSingleProfile(id: number, profile: Profile_public2): Observable<any> {

    // Adoption of a FormData to solve a file upload problem
    let formData = new FormData();
    formData.append('firstname', profile.firstname as string);
    formData.append('name', profile.name as string);
    formData.append('email', profile.email as string);
    formData.append('bio', profile.bio as string);
    formData.append('photo', profile.photo as string);
    formData.append('file', profile.file as File);

    return this.http.put(
      `${environment.URL_BACKEND}/api/users/${id}`,
      formData,
      { 
        headers: new HttpHeaders({
          //'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

}
