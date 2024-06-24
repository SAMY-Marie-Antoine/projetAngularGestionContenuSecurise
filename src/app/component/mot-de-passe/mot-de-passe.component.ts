import { Component } from '@angular/core';
import { MdpFortHttpService } from '../../services/mdp-fort-http.service';

@Component({
  selector: 'mot-de-passe, [mot-de-passe]',
  templateUrl: './mot-de-passe.component.html',
  styleUrl: './mot-de-passe.component.css'
})
export class MotDePasseComponent {

  motDePasseFort: string = '';
  passwordToTest: string = '';
  passwordStrength: string = '';
  passwordToCheck: string = '';
  passwordCompromised: boolean = false;

  constructor(private mdpFortService: MdpFortHttpService) { }

  // Méthode appelée lors du clic sur le lien de génération de mot de passe fort
  genererMotDePasseFort(): void {
    this.mdpFortService.generateMotDePasseFort().subscribe(
      (motDePasse: string) => {
        this.motDePasseFort = motDePasse;
      },
      (error) => {
        console.error('Erreur lors de la génération du mot de passe fort', error);
      }
    );
  }

  // Méthode pour tester la robustesse du mot de passe
  testerMotDePasse(): void {
    // Ici, vous pouvez appeler votre service pour tester la robustesse du mot de passe
    // Et mettre à jour la variable passwordStrength en conséquence
  }

  // Méthode pour vérifier si le mot de passe a été compromis
  verifierMotDePasse(): void {
    // Ici, vous pouvez appeler votre service pour vérifier si le mot de passe a été compromis
    // Et mettre à jour la variable passwordCompromised en conséquence
  }

}
