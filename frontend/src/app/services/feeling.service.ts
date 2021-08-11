import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeelingService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  /*--------------------------------------------------------------------*/
  
  /** 
  * Request to the REST API to add a dislike to a target message.
  * @param {number} messageId
  * @return {Observable<any>} Type of observable according to the response received.
  */
  addDislike(messageId: number): Observable<any> {
    return this.http.post(
      `${environment.URL_BACKEND}/api/feelings/dislike`,
      {messageId: messageId},
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

  /** 
  * Request to the REST API to add a like to a target message.
  * @param {number} messageId
  * @return {Observable<any>} Type of observable according to the response received.
  */
  addLike(messageId: number): Observable<any> {
    return this.http.post(
      `${environment.URL_BACKEND}/api/feelings/like`,
      {messageId: messageId},
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }
  
  /** 
  * Request to the REST API to remove a dislike to a target message.
  * @param {number} messageId
  * @return {Observable<any>} Type of observable according to the response received.
  */
  delDislike(messageId: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_BACKEND}/api/feelings/dislike/${messageId}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

  /** 
  * Request to the REST API to remove a like to a target message.
  * @param {number} messageId
  * @return {Observable<any>} Type of observable according to the response received.
  */
  delLike(messageId: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_BACKEND}/api/feelings/like/${messageId}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

}
