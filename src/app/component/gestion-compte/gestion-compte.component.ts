import { Component, OnInit } from '@angular/core';
import { Compte, Utilisateur } from '../../model/model';
import { Router } from '@angular/router';
import { GestionCompteHttpService } from '../../services/gestion-compte-http.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gestion-compte, [gestion-compte]',
  templateUrl: './gestion-compte.component.html',
  styleUrl: './gestion-compte.component.css',
})
export class GestionCompteComponent implements OnInit{

  recherche: string = '';
  gestionCompteForm?: Compte;
  comptes: Compte[] = []; // Liste des comptes

  constructor(
    private router: Router,
    private gestionCompteHttpService: GestionCompteHttpService,
    private authService: AuthService
  ) {} 

  //H 19h
  ngOnInit(): void {
    // Obtenez l'ID de l'utilisateur connecté à partir du service d'authentification
    const userId = this.authService.getUserId(); 
    this.gestionCompteHttpService.getComptesUpdated().subscribe((comptes: Compte[]) => {
      this.comptes = comptes;
    });
    this.gestionCompteHttpService.load();
  }

  save() {
    if (this.gestionCompteForm) {
      if (this.gestionCompteForm?.id) {
        // modification de la note existante
        this.gestionCompteForm.dateMAJ = new Date(); // Mettre à jour la date de modification
        this.gestionCompteHttpService.update(this.gestionCompteForm);      
      } else {
        // création d'un nouveau compte
        this.gestionCompteHttpService.create(this.gestionCompteForm);
      }
    }
    this.gestionCompteForm = undefined;
  }

  /* list(): Array<Compte> {
    return this.gestionCompteHttpService.findAll();
  } */
  get list(): Array<Compte> {
    return this.gestionCompteHttpService.findAll();
  }

  search(rech: string) {
    // Met à jour la propriété 'recherche' avec la nouvelle valeur
    this.recherche = rech;
    // Effectue la recherche avec la nouvelle valeur
    this.gestionCompteHttpService.loadByNom(rech);
  }

  /* goToDetail(id?: string) {
    this.router.navigate(['/compte', id]);
  } */

  add() {
    // Initialiser le formulaire avec une nouvelle compte et les dates du jour
    this.gestionCompteForm = new Compte();
    const currentDate = new Date();
    this.gestionCompteForm.dateAjout = currentDate;
    this.gestionCompteForm.dateMAJ = currentDate;
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

  /* edit(id?: string) {
    this.gestionCompteHttpService
      .findById(id)
      .subscribe((response: Compte | undefined) => {
        if (response) {
          this.gestionCompteForm = response;
        }
      });
  } */
    // h ajout 19h30
    edit(id?: string) {
      this.gestionCompteHttpService.findById(id).subscribe((response: Compte | undefined) => {
        if (response) {
          this.gestionCompteForm = response;
        }
      });
    }
    

  remove(id?: string) {
    this.gestionCompteHttpService.delete(id);
  }

  cancel() {
    this.gestionCompteForm = undefined;
  }

  // Ajout de vérifications pour éviter les erreurs
  updateDateAjout(event: string) {
    if (this.gestionCompteForm) {
      this.gestionCompteForm.dateAjout = new Date(event);
    }
  }

  updateDateModif(event: string) {
    if (this.gestionCompteForm) {
      this.gestionCompteForm.dateMAJ = new Date(event);
    }
  }
}
