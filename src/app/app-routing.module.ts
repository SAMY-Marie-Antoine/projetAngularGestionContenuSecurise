import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { CompteComponent } from './component/compte/compte.component';
import { GestionCompteComponent } from './component/gestion-compte/gestion-compte.component';
import { GestionNoteComponent } from './component/gestion-note/gestion-note.component';
import { MotDePasseComponent } from './component/mot-de-passe/mot-de-passe.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ContactComponent } from './component/contact/contact.component';
import { AboutComponent } from './component/about/about.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'gestioncompte', component: GestionCompteComponent },
  { path: 'gestionnote', component: GestionNoteComponent },
  { path: 'motdepasse', component: MotDePasseComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
