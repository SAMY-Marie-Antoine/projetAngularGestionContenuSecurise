import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/component/login/login.component';
import { SignupComponent } from '../app/component/signup/signup.component';
import { UserComponent } from '../app/component/user/user.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CompteComponent } from './component/compte/compte.component';
import { GestionCompteComponent } from './component/gestion-compte/gestion-compte.component';
import { GestionNoteComponent } from './component/gestion-note/gestion-note.component';
import { FooterComponent } from './component/footer/footer.component';
import { MotDePasseComponent } from './component/mot-de-passe/mot-de-passe.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    HomeComponent,
    NavbarComponent,
    CompteComponent,
    GestionCompteComponent,
    GestionNoteComponent,
    FooterComponent,
    MotDePasseComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
