import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reset-password, [reset-password]',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  resetPasswordForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  resetToken!: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.passwordCtrl = this.formBuilder.control('', [Validators.required]);
    this.confirmPasswordCtrl = this.formBuilder.control('', [Validators.required]);

    this.resetPasswordForm = this.formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    });

  }

  ngOnInit(): void {
    this.resetToken = this.route.snapshot.queryParams['token'];
  }

  resetPassword() {
    if (this.passwordCtrl.value !== this.confirmPasswordCtrl.value) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    this.authService.resetPassword(this.resetToken, this.passwordCtrl.value);
  }
}
