import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLog$: Subject<boolean> = new Subject<boolean>();  // code pour l'observable de la session

  constructor( private http: HttpClient ) {
    this.isLog$.next(false);
  }

  /*--------------------------------------------------------------------*/

  /** 
  * Request to the REST API to create a new user.
  * @param {string} firstname
  * @param {string} name
  * @param {string} email
  * @param {string} password
  * @return {Observable<object>} Type of observable according to the response received.
  */
  createNewUser(firstname: string, name: string, email: string, password: string): Observable<object> {
    return this.http.post<Object>(
      `${environment.URL_BACKEND}/api/users`, 
      { firstname: firstname, name: name, email: email, password: password }, 
      { headers: new HttpHeaders({'Content-Type':  'application/json'}) }
    );  
  } 

  /** 
  * Retrieves the value of isAdmin.
  * @return {boolean} returns true if the user has administrator rights.
  */
  getIsAdmin(): boolean {
    return sessionStorage.getItem('isAdmin') === 'true';
  }  
  
  /** 
  * Retrieves the user's ID.
  * @return {number} returns the user's ID.
  */
  getProfileId(): number {
    return parseInt(sessionStorage.getItem('userId')!, 10);
  }  
  
  /** 
  * Retrieves the user's token on frontend.
  * @return {string} returns the user's token.
  */
  getToken(): string {
    return sessionStorage.getItem('token')!;
  } 

  /** 
  * Allows to manage the menu between signIn and signOut mode.
  * @return {Observable<boolean>} Indicates the status of the connection.
  */
  isUserLoggedIn(): Observable<boolean> { // pour le menu réactif
    return this.isLog$;                   
  }

  /** 
  * Indicates the status of the connection's user.
  * @return {boolean} Returns true if the user is logged in.
  */  
  isConnected(): boolean {
    if(sessionStorage.getItem('token') !== null) {
      this.isLog$.next(true);
      return true;
    }
    return false;
  }

  /** 
  * Stores the ID, admin right and token in the sessionStorage.
  * @param {any} signInResult - Object containing the data to be stored.
  * @param {Function} _callback 
  */
  setSession(signInResult: any, _callback: Function): void {
    sessionStorage.setItem('userId', signInResult.userId);
    sessionStorage.setItem('isAdmin', signInResult.isAdmin);
    sessionStorage.setItem('token', signInResult.token);
    this.isLog$.next(true);
    _callback();
  }  
  
  /** 
  * Request to the REST API to login a user.
  * @param {string} email
  * @param {string} password
  * @return {Observable<object>} Type of observable according to the response received.
  */
  signInUser(email: string, password: string): Observable<object> {
    return this.http.post<Object>(
      `${environment.URL_BACKEND}/api/users/identify`, 
      { email: email, password: password }, 
      { headers: new HttpHeaders({'Content-Type':  'application/json'}) }
    );  
  }  

  /** 
  * deletes the data stored on the sessionStorage.
  */
  signOutUser(): void {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('token');
    this.isLog$.next(false); 
  }

}