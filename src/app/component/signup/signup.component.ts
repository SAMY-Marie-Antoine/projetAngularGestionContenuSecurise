import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { SignupHttpService } from '../../services/signup-http.service';
import { Utilisateur } from '../../model/model';

@Component({
  selector: 'signup, [signup]',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  //utilisateurForm?: Utilisateur;
  inscriptionForm!: FormGroup;

  nomCtrl!: FormControl;
  dateDeNaissanceCtrl!: FormControl;
  emailCtrl!: FormControl;
  motDePasseCtrl!: FormControl;
  confirmMotDePasseCtrl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService //private signupHttpService: SignupHttpService
  ) {
    this.nomCtrl = this.formBuilder.control('', Validators.required);
    this.dateDeNaissanceCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.maxLength(10),
    ]);
    this.emailCtrl = this.formBuilder.control('', Validators.required);
    this.motDePasseCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(9),
    ]);
    this.confirmMotDePasseCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(9),
    ]);
    this.inscriptionForm = this.formBuilder.group({
      nom: this.nomCtrl,
      dateDeNaissance: this.dateDeNaissanceCtrl,
      email: this.emailCtrl,
      motDePasse: this.motDePasseCtrl,
      confirmMotDePasse: this.confirmMotDePasseCtrl,
    });
  }

  inscription() {
    console.log();
    this.authService.signUp(
      this.nomCtrl.value,
      this.dateDeNaissanceCtrl.value,
      this.emailCtrl.value,
      this.motDePasseCtrl.value,
      this.confirmMotDePasseCtrl.value
    );
  }
}
