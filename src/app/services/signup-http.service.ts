import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/model';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupHttpService {
  private utilisateurs: Array<Utilisateur> = new Array<Utilisateur>();

  constructor(private http: HttpClient) {
    this.load();
  }
  load() {
    this.http
      .get<Utilisateur[]>(environment.apiUrl + '/utilisateur/inscription')
      .subscribe((resp) => {
        this.utilisateurs = resp;
        console.log('je suis dans load');
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
    console.log('je suis dans create');
  }
}
