/**
* @file Display and modification of the profile by the user
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertComponent } from '../shared/dialog/alert/alert.component';
import { ConfirmationComponent } from '../shared/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    photo : new FormControl(''),  // RAJOUTER LE 24 07 2021
    firstname : new FormControl(''),
    name : new FormControl(''),
    email : new FormControl(''),
    oldpassword: new FormControl(''),
    newpassword: new FormControl(''),
    bio : new FormControl('')
  });
  profile!: Profile;
  selectedFile: File | any;
  hide: boolean = true;
  hide2: boolean = true;
  myFile: File | any;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private titleService: Title) {
      this.titleService.setTitle('Groupomania - Votre profil');
    }

  ngOnInit(): void {
    this.profileService.getSingleProfile(this.authService.getProfileId()).subscribe(data => {
      this.profile = data;
      this.initForm();
    });
  }

  /*--------------------------------------------------------------------*/

  /** 
  * Initialization of the form.
  */
  initForm(): void {
    this.profileForm = this.formBuilder.group({
      photo: [],
      firstname: [this.profile.firstname],  //[Validators.required, Validators.pattern('^[a-zA-Z]+$')]
      name: [this.profile.name],  //[Validators.required, Validators.pattern('^[a-zA-Z]+$')]
      email: [this.profile.email, [Validators.required, Validators.email]],
      oldpassword: [{value: '', disabled: true}], // fonctionnalité en attente
      newpassword: [{value: '', disabled: true}], // fonctionnalité en attente
      bio: [this.profile.bio]
    });
    this.selectedFile = this.profile.photo;
  }

  /** 
  * Very important small function that allows the preview of the selected image file 
  * but also prepares the upload to the backend server. (Adapted from project 6 with 
  * some modifications for compatibility with Angular 12).
  * @summary Manages the selection of the image file.
  * @param {Event} event - Get the event from the frontend.
  */
  onChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    this.myFile = file;
    this.profileForm.get('photo')!.setValue(file, {emitModelToViewChange: false});
    this.profileForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  /** 
  * Deleting the present user with a confirmation window.
  */  
  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent,{
      data:{
        message: 'Etes-vous sûr de vouloir supprimer votre profil?',
        buttonText: {
          ok: 'Supprimer',
          cancel: 'Annuler'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Effacer le profil après confirmation
        this.profileService.delSingleProfile(this.authService.getProfileId()).subscribe(() => {
        console.log("Le profil a été supprimé!");
        this.authService.signOutUser();
        this.router.navigate(['signout']);
        });
      }
    });
  }

  /** 
  * Validation of the form.
  */
  onSubmit(): void {
    this.profileService.setSingleProfile(this.authService.getProfileId(), {
      firstname: this.profileForm.get('firstname')!.value,
      name: this.profileForm.get('name')!.value,
      email: this.profileForm.get('email')!.value,
      bio: this.profileForm.get('bio')!.value,
      photo: this.profile.photo,
      file: this.myFile
    }).subscribe(() => {
      const dialogRef = this.dialog.open(
        AlertComponent, {
          data: {
            message: 'Mise à jour prise en compte',
            buttonText: { cancel: 'Fermer' }
          }
        }
      );
      console.log('Mise à jour effectuée'); 
    });
  }
  
}