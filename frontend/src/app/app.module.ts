/* modules */
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

/* components */
import { AppComponent } from './app.component';
import { CommentComponent } from './layout/comment/comment.component';
import { ContactsComponent } from './layout/contacts/contacts.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ForgotComponent } from './layout/auth/forgot/forgot.component';
import { FourOhFourComponent } from './layout/four-oh-four/four-oh-four.component';
import { HeaderNavComponent } from './layout/header-nav/header-nav.component';
import { NewsComponent } from './layout/news/news.component';
import { NotifComponent } from './layout/notif/notif.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { SigninComponent } from './layout/auth/signin/signin.component';
import { SignoutComponent } from './layout/auth/signout/signout.component';
import { SignupComponent } from './layout/auth/signup/signup.component';
import { SubmitComponent } from './layout/submit/submit.component';

/* directives */

/* services */
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CommentService } from './services/comment.service';
import { FeelingService } from './services/feeling.service';
import { MessageService } from './services/message.service';
import { NotifService } from './services/notif.service';
import { ProfileService } from './services/profile.service';

/* material */
import { LayoutModule } from '@angular/cdk/layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmationComponent } from './layout/shared/dialog/confirmation/confirmation.component';
import { AlertComponent } from './layout/shared/dialog/alert/alert.component';

const appRoutes: Routes = [
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuardService] },
  { path: 'forgot', component: ForgotComponent },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuardService] },
  { path: 'notif', component: NotifComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'signin', component: SigninComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'submit', component: SubmitComponent, canActivate: [AuthGuardService] },
  { path: '', component: NewsComponent, canActivate: [AuthGuardService] },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    ContactsComponent,
    FooterComponent,
    ForgotComponent,
    FourOhFourComponent,
    HeaderNavComponent,
    NewsComponent,
    NotifComponent,
    ProfileComponent,
    SigninComponent,
    SignoutComponent,
    SignupComponent,
    SubmitComponent,
    ConfirmationComponent,
    AlertComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuardService,
    AuthService,
    CommentService,
    FeelingService,
    MessageService,
    NotifService,
    ProfileService,
    Title,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline', floatLabel: 'always'}},
    {provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
