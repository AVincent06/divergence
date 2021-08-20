/**
* @file Registration form with form initialization, account creation and login.
* @author Vincent Augugliaro <vincent.augugliaro@orange.fr>
* @copyright Vincent Augugliaro 2021
* @license GNU_General_Public_License_v3.0
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({  
    firstname : new FormControl(''),
    name : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    passwordcheck : new FormControl('')
  });
  errorMessage: string = '';
  hide: boolean = true;
  hide2: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private titleService: Title) {
    this.titleService.setTitle('Divergence - Inscrivez-vous!');
  }

  ngOnInit(): void {
    this.initForm();
  }

  /*--------------------------------------------------------------------*/

  /** 
  * Initialization of the form.
  */
  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      firstname: [''],  // [Validators.required, Validators.pattern('^[a-zA-Z]+$')]
      name: [''], // [Validators.required, Validators.pattern('^[a-zA-Z]+$')]
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(12)]],
      passwordcheck: ['',[Validators.required, Validators.minLength(12)]]
    })
  }

  /** 
  * Validation of the form.
  * @return {Promise} Consequence of async to respect the order of the function calling process.
  */
  async onSubmit(): Promise<void> {
    const firstname = this.signUpForm.get('firstname')!.value;
    const name = this.signUpForm.get('name')!.value;
    const email = this.signUpForm.get('email')!.value;
    const password = this.signUpForm.get('password')!.value;
    
    await this.authService.createNewUser(firstname, name, email, password).subscribe(async () => {
      await this.authService.signInUser(email, password).subscribe(async (data) => {
        if(data) {
          await this.authService.setSession(data, async () => {
            await this.router.navigate(['news']);
          });
        } else {
          this.router.navigate(['signin']);
          this.errorMessage = "Erreur";
        }
      });
    });
  }
}
