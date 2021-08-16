/**
* @file Management of news display, as well as likes/dislikes and comment display.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeelingService } from 'src/app/services/feeling.service';
import { MessageService } from 'src/app/services/message.service';
import { ConfirmationComponent } from '../shared/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  profileId!: number;
  isAdmin!: boolean;
  messages: any[] = [];
  nbNews: number = 5; // number by default

  constructor(
    private authService : AuthService,
    private dialog: MatDialog,
    private feelingService : FeelingService,
    private messagesService: MessageService, 
    private router: Router,
    private titleService: Title) {
    this.titleService.setTitle('Groupomania - Actualités');
  }

  ngOnInit(): void {
    this.profileId = this.authService.getProfileId();
    this.isAdmin = this.authService.getIsAdmin();

    this.messagesService.getNewsByAmount(this.nbNews).subscribe((data: any) => {
      this.messages = data;
    });
  }
  
  /*--------------------------------------------------------------------*/

  /** 
  * Decrements the counter, triggered by an event in the child element of news.
  * @param {number} index - Indicates the position of the message in the local "messages" array.
  */
  decMessageComments(index: number): void {
    this.messages[index].nbComments--;
  }
  
  /** 
  * Increments the counter, triggered by an event in the child element of news.
  * @param {number} index - Indicates the position of the message in the local "messages" array.
  */
   incMessageComments(index: number): void {
    this.messages[index].nbComments++;
  }

  /** 
  * Allows to quickly know if the connected user has already "liked" or "disliked" a message.
  * (replaces the isLikedBy and isDislikedBy functions)
  * @param {number[]} list - Table of all users who have "like" or all those who have "dislike.
  * @return {boolean} Returns true if the user is in the array, otherwise returns false.
  */
  isOneOfThem(list: number[]): boolean {
    if( list.find(id => id == this.profileId) ) return true;
    return false;
  }

  /** 
  * Deleting the targeted message with a confirmation window.
  * @param {number} id - Primary key of the message in the Messages table.
  */
  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent,{
      data:{
        message: 'Etes-vous sûr de vouloir supprimer ce message?',
        buttonText: {
          ok: 'Supprimer',
          cancel: 'Annuler'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Delete the message after confirmation
        this.messagesService.delMessage(id).subscribe(() => {
          console.log("Le message a été supprimé!");
          
          // Refreshing news after deletion
          this.messagesService.getNewsByAmount(this.nbNews).subscribe((data: any) => {
            this.messages = data;
          });
        });
      }
    });  
  }

  /** 
  * Manages the use of the "dislike" button at both UI/UX and database level.
  * @param {number} index - Represents the display position of the message in the loop.
  */  
  onDislike(index: number): void {
    const element = document.getElementById("dislikes-"+index);

    if( this.isOneOfThem(this.messages[index].usersDisliked) ) {

      // If dislike is already checked, uncheck it
      this.feelingService.delDislike(this.messages[index].id).subscribe(() => {
        for(let i = 0; i < this.messages[index].usersDisliked.length; i++){
          if(this.messages[index].usersDisliked[i] == this.profileId) {
            this.messages[index].usersDisliked.splice(i, 1);
            break;
          }
        }
        document.getElementById("down-"+index)!.innerHTML = 'thumb_down_off_alt'; // update of the icon

        // Correction of total dislikes
        this.messages[index].dislikes = this.messages[index].usersDisliked.length;
        element!.innerHTML = this.messages[index].usersDisliked.length;
      });

    } else {

      // If dislike is not checked, we check it
      this.feelingService.addDislike(this.messages[index].id).subscribe(() => {
        this.messages[index].usersDisliked.push(this.profileId);
        document.getElementById("down-"+index)!.innerHTML = 'thumb_down_alt'; // mise à jour de l'icone

        // Correction of total dislikes
        this.messages[index].dislikes = this.messages[index].usersDisliked.length;
        element!.innerHTML = this.messages[index].usersDisliked.length;
      });

    }
  }
  
  /** 
  * Manages the use of the "like" button at both UI/UX and database level.
  * @param {number} index - Represents the display position of the message in the loop.
  */ 
  onLike(index: number): void {
    const element = document.getElementById("likes-"+index);

    if( this.isOneOfThem(this.messages[index].usersLiked) ) {

      // If the like is already checked, it is unchecked
      this.feelingService.delLike(this.messages[index].id).subscribe(() => {
        for(let i = 0; i < this.messages[index].usersLiked.length; i++){
          if(this.messages[index].usersLiked[i] == this.profileId) {
            this.messages[index].usersLiked.splice(i, 1);
            break;
          }
        }
        document.getElementById("up-"+index)!.innerHTML = 'thumb_up_off_alt'; // mise à jour de l'icone

        // Correcting the total number of likes
        this.messages[index].likes = this.messages[index].usersLiked.length;
        element!.innerHTML = this.messages[index].usersLiked.length;
      });

    } else {

      // If the like is not checked, we check it
      this.feelingService.addLike(this.messages[index].id).subscribe(() => {
        this.messages[index].usersLiked.push(this.profileId);
        document.getElementById("up-"+index)!.innerHTML = 'thumb_up_alt'; // update of the icon

        // Correcting the total number of likes
        this.messages[index].likes = this.messages[index].usersLiked.length;
        element!.innerHTML = this.messages[index].usersLiked.length;
      });

    }
  }

  /** 
  * Manages the condition for displaying the comment block below the relevant message.
  * @param {number} index - Represents the display position of the comments in the loop.
  */  
  onShow(index: number): void {
    let myElement = document.getElementById("comments-" + index);
    if(myElement!.style.display === "none") {
      myElement!.style.display = "block";
    } else {
      myElement!.style.display = "none";
    }
  }

  /** 
  * (function to come, pending) Will redirect to a dedicated message page or to a sub-component.
  * @param {number} id - Identifies the position of the message in the display loop.
  */
  onViewMessage(id: number) {
    // this.router.navigate(['/message', 'view', id])
  }

}