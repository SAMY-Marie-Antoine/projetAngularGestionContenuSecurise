import { Injectable } from '@angular/core';
import { Compte } from '../model/model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class GestionCompteHttpService {
  private comptes: Compte[] = new Array<Compte>();

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    let obs: Observable<Compte[]> = this.http.get<Compte[]>(
      environment.apiUrl + '/compte'
    );

    obs.subscribe((resp) => {
      this.comptes = resp;
    });
  }

  loadByTitle(title: string) {
    if (title) {
      this.http
        .get<Compte[]>(environment.apiUrl + '/compte/by-title/' + title)
        .subscribe((resp) => {
          this.comptes = resp;
        });
    } else {
      this.load();
    }
  }

  findAll(): Compte[] {
    return this.comptes;
  }

  findById(id?: string): Observable<Compte> {
    return this.http.get<Compte>(environment.apiUrl + '/compte/' + id);
  }

  create(compte: Compte): void {
    this.http
      .post<Compte>(environment.apiUrl + '/compte', compte)
      .subscribe((resp) => {
        this.load();
      });
  }

  update(compte: Compte): void {
    this.http
      .put<Compte>(environment.apiUrl + '/compte/' + compte.id, compte)
      .subscribe((resp) => {
        this.load();
      });
  }

  delete(id?: string): void {
    this.http
      .delete<void>(environment.apiUrl + '/compte/' + id)
      .subscribe((resp) => {
        this.load();
      });
  }
}
