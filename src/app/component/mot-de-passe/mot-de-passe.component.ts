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
  passwordStrength: boolean | null = null;// Initialisé à null pour ne pas afficher le résultat avant le test
  passwordToCheck: string = ''; //mdp que utilisateur veut vérifier si compromis ou non
  passwordCompromised: boolean | null = null; //resultat de la verification si mdp compromis ou non

  // Injection du service MdpFortHttpService dans le constructeur
  constructor(private mdpFortService: MdpFortHttpService) { }

  // Méthode appelée lors du clic sur le lien de génération de mot de passe fort
  genererMotDePasseFort(): void {
    this.mdpFortService.generateMotDePasseFort().subscribe(
      (motDePasse: string) => {
        this.motDePasseFort = motDePasse;// Met à jour la variable motDePasseFort avec le mot de passe généré
      },
      (error) => {
        console.error('Erreur lors de la génération du mot de passe fort', error);
      }
    );
  }

  // Méthode pour tester la robustesse du mot de passe
  testerMotDePasse(): void {
    this.mdpFortService.testerMotDePasse(this.passwordToTest).subscribe(
      (isStrong: boolean) => {
        this.passwordStrength = isStrong;  // Met à jour la variable passwordStrength avec le résultat du test
      },
      (error) => {
        console.error('Erreur lors du test de la robustesse du mot de passe', error);
      }
    );
  }

  // Méthode pour vérifier si le mot de passe a été compromis
  verifierMotDePasse(): void {
    this.mdpFortService.verifierMotDePasse(this.passwordToCheck).subscribe(
      (isCompromised: boolean) => {
        this.passwordCompromised = isCompromised;  // Met à jour la variable passwordCompromised avec le résultat de la vérification
      },
      (error) => {
        console.error('Erreur lors de la vérification du mot de passe', error);
      }
    );
  }

}
