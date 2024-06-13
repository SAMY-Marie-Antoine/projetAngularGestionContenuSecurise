import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/environment'; //à mettre environnement-prod
import { Utilisateur } from '../model/model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private utilisateur?: Utilisateur = undefined;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.http
      .post<Utilisateur>(environment.apiUrl + '/utilisateur/connexion', {
        login: username,
        password: password,
      })
      .subscribe((resp) => {
        this.utilisateur = resp;

        this.router.navigate(['/home']);
      });
  }

  logout() {
    this.utilisateur = undefined;
  }

  isLogged(): boolean {
    return this.utilisateur != undefined;
  }

  getUtilisateur(): Utilisateur | undefined {
    if (this.utilisateur) {
      return this.utilisateur;
    }

    return undefined;
  }
}
