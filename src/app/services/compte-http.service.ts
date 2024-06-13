import { Injectable } from '@angular/core';
import { Compte } from '../model/model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class CompteHttpService {
  private comptes: Array<Compte> = new Array<Compte>();

  constructor(private http: HttpClient) {
    this.load();
  }
  load() {
    this.http
      .get<Compte[]>(environment.apiUrl + '/compte')
      .subscribe((resp) => {
        this.comptes = resp;
        console.log('je suis dans load');
      });
  }

  create(compte: Compte): void {
    this.http
      .post<Compte>(environment.apiUrl + '/compte', compte)
      .subscribe((resp) => {
        this.load();
      });
    console.log('je suis dans create');
  }
}
