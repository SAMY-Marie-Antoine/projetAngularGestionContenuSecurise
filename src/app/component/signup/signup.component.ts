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
  utilisateurForm?: Utilisateur;
  inscriptionForm!: FormGroup;

  nameCtrl!: FormControl;
  firstnameCtrl!: FormControl;
  emailCtrl!: FormControl;
  dateDeNaissanceCtrl!: FormControl;
  passwordCtrl!: FormControl;
  passwordConfirmCtrl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private signupHttpService: SignupHttpService
  ) {
    this.nameCtrl = this.formBuilder.control('', Validators.required);
    this.firstnameCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(5),
    ]);
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
      firstname: this.firstnameCtrl,
      email: this.emailCtrl,
      dateDeNaissance: this.dateDeNaissanceCtrl,
      password: this.passwordCtrl,
      passwordConfirm: this.passwordConfirmCtrl,
    });
  }

  inscription() {
    if (this.utilisateurForm) {
      if (this.utilisateurForm?.id) {
        this.signupHttpService.create(this.utilisateurForm);
        console.log('Je suis dans create');
      }
      this.utilisateurForm = undefined;
    }
  }
}
