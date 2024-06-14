import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { CompteComponent } from './component/compte/compte.component';
import { GestionCompteComponent } from './component/gestion-compte/gestion-compte.component';
import { GestionNoteComponent } from './component/gestion-note/gestion-note.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'gestioncompte', component: GestionCompteComponent },
  { path: 'gestionnote', component: GestionNoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
