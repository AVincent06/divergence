/**
* @file Services grouping together all the functions relating to the management of comments.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment_get } from '../models/comment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  comments: Comment_get[] = [];
  

  constructor( private http: HttpClient, private authService: AuthService ) { 
    this.comments = [];
  }

  /*--------------------------------------------------------------------*/ 

  /** 
  * Request to the REST API to create a comment on a distinct message.
  * @param {string} feedback
  * @param {number} messageId
  * @return {Observable<any>} Type of observable according to the response received.
  */
  createNewComment(feedback: string, messageId: number): Observable<any> {
    return this.http.post(
      `${environment.URL_BACKEND}/api/comments`,
      {
        feedback: feedback,
        messageId: messageId
      },
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }
    
  /** 
  * Request to the REST API to get all comment on a distinct message.
  * @param {number} messageId
  * @return {Observable<Comment_get[]>} Returns an array of data formatted according to the model.
  */
  getCommentsByMessage(messageId: number): Observable<Comment_get[]> {
    return this.http.get<Comment_get[]>(
      `${environment.URL_BACKEND}/api/comments/message/${messageId}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }
     
  /** 
  * Request to the REST API to delete a comment on a distinct message.
  * @param {number} id
  * @return {Observable<any>} Type of observable according to the response received.
  */
  removeComment(id: number): Observable<any> {
    return this.http.delete(
      `${environment.URL_BACKEND}/api/comments/${id}`,
      { 
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + this.authService.getToken() 
        }) 
      }
    );
  }

}
    