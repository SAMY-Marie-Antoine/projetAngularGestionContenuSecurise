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
  // Variable pour stocker le message d'erreur
  errorMessage: string = '';

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
    }else{
      // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      this.router.navigate(['/login']);
    }
  }

  /* connexion() {
    this.authService.login(this.emailCtrl.value, this.motDePasseCtrl.value);
  } */

    connexion() {
      // Réinitialiser le message d'erreur
      this.errorMessage = '';

      // Appel au service d'authentification pour se connecter
      this.authService.login(this.emailCtrl.value, this.motDePasseCtrl.value).subscribe({
        next: () => {
          // Redirection vers la page d'accueil en cas de succès
          this.router.navigate(['/home']);
        },
        error: (error) => {
          // Log de l'erreur pour analyse
          console.error('Erreur de connexion', error);

          // Affichage du message d'erreur en cas d'échec
          if (error.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect.';
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
          }
        }
      });
    }
}
