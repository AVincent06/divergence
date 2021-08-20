/**
* @file Form for entering new messages to be posted.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})

export class SubmitComponent implements OnInit {

  editorForm = new FormGroup({  
    picture : new FormControl(''),
    editor : new FormControl('')
  });
  selectedFile: File | any;
  myFile: File | any;

  constructor(private formBuilder: FormBuilder,
              private messagesService: MessageService,
              private router: Router, 
              private authService: AuthService,
              private titleService: Title) {
    this.titleService.setTitle('Divergence - Publiez votre message!');
  }

  ngOnInit(): void {
    this.initForm();
  }

  /*--------------------------------------------------------------------*/

  /** 
  * Initialization of the form.
  */
  initForm(): void {
    this.editorForm = this.formBuilder.group({
      editor: [''],
      picture: []
    })
  }

  /** 
  * Very important small function that allows the preview of the selected image file 
  * but also prepares the upload to the backend server. (Adapted from project 6 with 
  * some modifications for compatibility with Angular 12).
  * @summary Manages the selection of the image file.
  * @param {Event} event - Get the event from the frontend.
  */
  onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.myFile = file;
    this.editorForm.get('picture')!.setValue(file, {emitModelToViewChange: false});
    this.editorForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  /** 
  * Validation of the form.
  */
  onSubmit(): void {
    this.messagesService.postMessage({
      file: this.myFile,
      article: this.editorForm.get('editor')!.value,
      user_id: this.authService.getProfileId()
    }).subscribe(() => {
      console.log('Nouveau message posté!');
      this.router.navigate(['news']);
    }); 
  }

}
