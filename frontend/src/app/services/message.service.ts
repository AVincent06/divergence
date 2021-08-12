/**
* @file Services grouping together all the functions relating to the management of messages.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message_news, Message_post } from '../models/message.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( private http: HttpClient, private authService: AuthService ) {}

  /*--------------------------------------------------------------------*/

  /** 
  * Request to the REST API to delete a message to a target id.
  * @param {number} id - the message's id in its table
  * @return {Observable<any>} Type of observable according to the response received.
  */
  delMessage(id: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_BACKEND}/api/messages/${id}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

  /** 
  * Request to the REST API to get the last 5 messages in descending chronological order.
  * @param {number} nb - Quantity of news to be returned via the request.
  * @return {Observable<Message_news>} Observable of type Message_news declared in message.model.ts
  */
  getNewsByAmount(nb: number): Observable<Message_news> {
    return this.http.get<Message_news>(
      `${environment.URL_BACKEND}/api/messages/amount/${nb}/news`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

  /**
  * Request to the REST API to create a new message for the currently logged-in user. This message will consist of an image and/or text.
  * @summary Create a new message.
  * @param {Message_post} message - Object of type Message_post declared in message.model.ts
  * @return {Observable<any>} Type of observable according to the response received.
  */
  postMessage(message: Message_post): Observable<any> {

    // Adoption d'un FormData pour résoudre un problème d'upload de fichier
    let formData = new FormData();
    formData.append('file', message.file as File);
    formData.append('article', message.article as string);
    formData.append('user_id', message.user_id.toString());

    return this.http.post(
      `${environment.URL_BACKEND}/api/messages/`,
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