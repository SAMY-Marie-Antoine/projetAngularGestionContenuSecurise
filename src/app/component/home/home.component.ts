import { Component } from '@angular/core';
import { MdpFortHttpService } from '../../services/mdp-fort-http.service';

@Component({
  selector: 'home, [home]',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  motDePasseFort: string = '';

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

}
