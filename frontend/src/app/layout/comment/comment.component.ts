import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Comment_get } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ConfirmationComponent } from '../shared/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {

  @Input() index!: number;
  @Input() messageId!: number;
  @Output() incNbComments = new EventEmitter<number>();
  @Output() decNbComments = new EventEmitter<number>();

  profileId!: number;
  isAdmin!: boolean;
  comments: Comment_get[] = [];
  commentForm = new FormGroup({  
    comment : new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private dialog: MatDialog,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.profileId = this.authService.getProfileId();
    this.isAdmin = this.authService.getIsAdmin();

    this.commentService.getCommentsByMessage(this.messageId).subscribe((data) => {
      this.comments = data;
    });

    this.initForm();
  }

  /*--------------------------------------------------------------------*/

  /** 
  * Initialization of the form.
  */
  initForm(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['',[Validators.required, Validators.maxLength(255)]]
    })
  }

  /** 
  * Deleting the targeted comment with a confirmation window.
  * @param {number} id - Primary key of the comment in the Comments table.
  */
  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent,{
      data:{
        message: 'Etes-vous sûr de vouloir supprimer ce commentaire?',
        buttonText: {
          ok: 'Supprimer',
          cancel: 'Annuler'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Effacer le commentaire après confirmation
        this.commentService.removeComment(id).subscribe(async () => {
          await this.commentService.getCommentsByMessage(this.messageId).subscribe((data) => {
            this.comments = data;
            this.decNbComments.emit(this.index);
          });
        });
      }
    });  
  }

  /** 
  * Validation of the form.
  */
  onSubmit(): void {
    const comment = this.commentForm.get('comment')!.value;
    
    this.commentService.createNewComment(comment, this.messageId).subscribe(async () => {
      await this.commentService.getCommentsByMessage(this.messageId).subscribe((data) => {
        this.comments = data;
        this.incNbComments.emit(this.index);
        this.commentForm.reset();
      });
    });
  }

}
