import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'login, [login]',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  emailCtrl!: FormControl;
  motDePasseCtrl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.emailCtrl = this.formBuilder.control('', Validators.required);
    this.motDePasseCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(5),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      motDePasse: this.motDePasseCtrl,
    });
  }

  connexion() {
    this.authService.login(this.emailCtrl.value, this.motDePasseCtrl.value);
  }
}
