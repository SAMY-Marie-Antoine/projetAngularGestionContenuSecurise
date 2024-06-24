import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login, [login]',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  emailCtrl!: FormControl;
  motDePasseCtrl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est déjà connecté
    if (this.authService.isLogged()) {
      // Si l'utilisateur est déjà connecté, redirigez-le vers la page d'accueil
      this.router.navigate(['/home']);
    }
  }

  connexion() {
    this.authService.login(this.emailCtrl.value, this.motDePasseCtrl.value);
  }
}
