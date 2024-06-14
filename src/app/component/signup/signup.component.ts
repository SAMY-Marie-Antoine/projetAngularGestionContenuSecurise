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

  nameCtrl!: FormControl;
  emailCtrl!: FormControl;
  dateDeNaissanceCtrl!: FormControl;
  passwordCtrl!: FormControl;
  passwordConfirmCtrl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) //private signupHttpService: SignupHttpService
  {
    this.nameCtrl = this.formBuilder.control('', Validators.required);
    this.emailCtrl = this.formBuilder.control('', Validators.required);
    this.dateDeNaissanceCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.maxLength(10),
    ]);
    this.passwordCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(9),
    ]);
    this.passwordConfirmCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(9),
    ]);
    this.inscriptionForm = this.formBuilder.group({
      name: this.nameCtrl,
      email: this.emailCtrl,
      dateDeNaissance: this.dateDeNaissanceCtrl,
      password: this.passwordCtrl,
      passwordConfirm: this.passwordConfirmCtrl,
    });
  }

  inscription() {
    console.log();
    this.authService.signUp(
      this.nameCtrl.value,
      this.emailCtrl.value,
      this.dateDeNaissanceCtrl.value,
      this.passwordCtrl.value,
      this.passwordConfirmCtrl.value
    );
  }
}
