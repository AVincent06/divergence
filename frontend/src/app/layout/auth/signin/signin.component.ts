import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  signInForm = new FormGroup({  
    email : new FormControl(''),
    password : new FormControl('')
  });
  errorMessage: string = '';
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Groupomania - Connectez-vous!');
  }

  ngOnInit(): void {
    this.initForm();
  }

  /*--------------------------------------------------------------------*/

  /** 
  * Initialization of the form.
  */
  initForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(12)]]
    })
  }

  /** 
  * Validation of the form.
  */
  onSubmit(): void {
    const email = this.signInForm.get('email')!.value;
    const password = this.signInForm.get('password')!.value;
    
    this.authService.signInUser(email, password).subscribe(data =>{
      if(data) {
        this.authService.setSession(data, () => {
          this.router.navigate(['news']);
        });
      } else {
        this.router.navigate(['signin']);
        this.errorMessage = "Erreur";
      }
    });
  }

}
