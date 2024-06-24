import { Component } from '@angular/core';
import { Compte } from '../../model/model';
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
    this.gestionCompteHttpService.loadByNom(rech);
  }

  goToDetail(id?: string) {
    this.router.navigate(['/compte', id]);
  }

  add() {
    this.gestionCompteForm = new Compte();
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
