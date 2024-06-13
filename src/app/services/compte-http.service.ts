import { Injectable } from '@angular/core';
import { Compte } from '../model/model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CompteHttpService {
  private comptes: Array<Compte> = new Array<Compte>();
  private compte?: Compte;

  constructor(private http: HttpClient, private router: Router) {
    this.load();
  }
  load() {
    this.http
      .get<Compte[]>(environment.apiUrl + '/compte')
      .subscribe((resp) => {
        this.comptes = resp;
      });
  }

  create(
    nom: string,
    description: string,
    dateAjout: string,
    dateMAJ: string,
    nomUtilisateurPlateforme: string,
    urlPlateforme: string,
    valeurMotdePassePlateforme: string
  ) {
    this.http
      .post<Compte>(environment.apiUrl + '/compte', {
        nom: nom,
        description: description,
        dateAjout: dateAjout,
        dateMAJ: dateMAJ,
        nomUtilisateurPlateforme: nomUtilisateurPlateforme,
        urlPlateforme: urlPlateforme,
        valeurMotdePassePlateforme: valeurMotdePassePlateforme,
      })
      .subscribe((resp) => {
        this.compte = resp;

        this.router.navigate(['/home']);
      });
  }
}
