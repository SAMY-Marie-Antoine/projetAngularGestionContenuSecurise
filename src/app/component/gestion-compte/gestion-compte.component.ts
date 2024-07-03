import { Component } from '@angular/core';
import { Compte, Utilisateur } from '../../model/model';
import { Router } from '@angular/router';
import { GestionCompteHttpService } from '../../services/gestion-compte-http.service';

@Component({
  selector: 'gestion-compte, [gestion-compte]',
  templateUrl: './gestion-compte.component.html',
  styleUrl: './gestion-compte.component.css',
})
export class GestionCompteComponent {
  recherche: string = '';

  gestionCompteForm?: Compte;


  constructor(
    private router: Router,
    private gestionCompteHttpService: GestionCompteHttpService
  ) {}

  save() {
    if (this.gestionCompteForm) {
      if (this.gestionCompteForm?.id) {
        // modification
        this.gestionCompteHttpService.update(this.gestionCompteForm);
      } else {
        // création
        this.gestionCompteHttpService.create(this.gestionCompteForm);
      }
    }

    this.gestionCompteForm = undefined;
  }

  list(): Array<Compte> {
    return this.gestionCompteHttpService.findAll();
  }

  search(rech: string) {
    // Met à jour la propriété 'recherche' avec la nouvelle valeur
    this.recherche = rech;
    // Effectue la recherche avec la nouvelle valeur
    this.gestionCompteHttpService.loadByNom(rech);
  }

  goToDetail(id?: string) {
    this.router.navigate(['/compte', id]);
  }

  add() {
    this.gestionCompteForm = new Compte();
    /*this.gestionCompteForm.utilisateur = new Utilisateur();//ajout h 01/7
    // Vérifiez si l'objet Utilisateur et son ID ne sont pas nuls
    if (this.gestionCompteForm.utilisateur && this.gestionCompteForm.utilisateur.id) {
      // L'objet Utilisateur et son ID ne sont pas nuls, vous pouvez appeler la méthode save()
      this.save();
    } else {
      // L'objet Utilisateur ou son ID est nul, affichez un message d'erreur à l'utilisateur
      console.error("L'objet Utilisateur est null ou l'ID de l'utilisateur est null");
    }*/
  }

  edit(id?: string) {
    this.gestionCompteHttpService
      .findById(id)
      .subscribe((response: Compte | undefined) => {
        this.gestionCompteForm = response;
      });
  }

  remove(id?: string) {
    this.gestionCompteHttpService.delete(id);
  }

  cancel() {
    this.gestionCompteForm = undefined;
  }
}
