import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  resetSuccess = false; // Variable pour suivre l'état de la réinitialisation
  errorMessage = ''; // Variable pour les messages d'erreur
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router // Injection du service Router pour la redirection
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

    this.authService.resetPassword(this.resetToken, this.passwordCtrl.value)
      .subscribe(response => {
        // Gérez la réponse ici
        console.log(response);

        // Réinitialisation réussie
        this.resetSuccess = true; // Activer l'état de succès
        this.errorMessage = ''; // Réinitialiser les messages d'erreur
      }, error => {
        // Gérez l'erreur ici
        this.errorMessage = 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.';
        console.error(error);
      }); 
  } 

  // Méthode pour rediriger vers la page de connexion après une réinitialisation réussie
  redirectToLogin() {
    this.router.navigate(['/login']); // Redirection vers la route '/login'
  }
  
}
