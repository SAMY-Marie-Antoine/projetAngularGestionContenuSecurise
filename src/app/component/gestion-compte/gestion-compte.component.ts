import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
        // modification du compte existant
        this.gestionCompteForm.dateMAJ = new Date(); // Mettre à jour la date de modification
        this.gestionCompteHttpService.update(this.gestionCompteForm);      
      } else {
        // création d'un nouveau compte
        this.gestionCompteHttpService.create(this.gestionCompteForm);
      }
    }
    this.gestionCompteForm = undefined;
  }

  get list(): Array<Compte> {
    return this.gestionCompteHttpService.findAll();
  }

  search(rech: string) {
    // Met à jour la propriété 'recherche' avec la nouvelle valeur
    this.recherche = rech;
    // Effectue la recherche avec la nouvelle valeur
    this.gestionCompteHttpService.loadByNom(rech);
  }

  add() {
    // Initialiser le formulaire avec une nouvelle compte et les dates du jour
    this.gestionCompteForm = new Compte();
    const currentDate = new Date();
    this.gestionCompteForm.dateAjout = currentDate;
    this.gestionCompteForm.dateMAJ = currentDate;
  }

  edit(id?: string) {
    this.gestionCompteHttpService.findById(id).subscribe((response: Compte | undefined) => {
      if (response) {
        this.gestionCompteForm = response;
        
        console.log('Compte édité:', this.gestionCompteForm); 
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
