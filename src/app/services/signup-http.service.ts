import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/model';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignupHttpService {
  private utilisateurs: Array<Utilisateur> = new Array<Utilisateur>();
  utilisateur: Utilisateur | undefined;
  router: any;

  constructor(private http: HttpClient, private route: Router) {
    this.load();
  }
  load() {
    this.http
      .get<Utilisateur[]>(environment.apiUrl + '/utilisateur/inscription')
      .subscribe((resp) => {
        this.utilisateurs = resp;
      });
  }

  create(utilisateur: Utilisateur): void {
    this.http
      .post<Utilisateur>(
        environment.apiUrl + '/utilisateur/inscription',
        utilisateur
      )
      .subscribe((resp) => {
        this.load();
      });
  }
}
