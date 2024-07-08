import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'forgot-password, [forgot-password]',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  emailCtrl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.emailCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]);

    this.forgotPasswordForm = this.formBuilder.group({
      email: this.emailCtrl,
    });
  }

  sendResetLink() {
    this.authService.sendPasswordResetLink(this.emailCtrl.value)
    .subscribe(response => {
      // Gérez la réponse ici
      console.log(response);
    }, error => {
      // Gérez l'erreur ici
      console.error(error);
    });
  } 
}

