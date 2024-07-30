import { Injectable } from '@angular/core';
import { Compte } from '../model/model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { environment } from '../env/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GestionCompteHttpService {

  private comptes: Compte[] = new Array<Compte>();
  // Ajout d'un Subject pour émettre les mises à jour de la liste des comptes H 3/7
  private comptesUpdated = new Subject<Compte[]>();

  constructor(private http: HttpClient, private authService: AuthService) {
    //this.load(); supp 19h
  }

  // méthode pour obtenir l'Observable du Subject H 3/7 18h
  getComptesUpdated() {
    return this.comptesUpdated.asObservable();
  }

    // H 3/7 20h
    load() {
      // Obtenez l'ID de l'utilisateur connecté à partir du service d'authentification
      const userId = this.authService.getUserId();

      this.http.get<Compte[]>(environment.apiUrl + '/compte/user/' + userId).subscribe((resp) => {
        this.comptes = resp;
        this.comptesUpdated.next([...this.comptes]);
      });
    }

  // Chargement des comptes filtrés par nom depuis l'API
  loadByNom(nom: string) {
    if (nom) {
      this.http
        .get<Compte[]>(environment.apiUrl + '/compte/by-name/' + nom)
        .subscribe((resp) => {
          this.comptes = resp;
          this.comptesUpdated.next([...this.comptes]); // MAJ tableau après la recherche 19h25
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
 
  /* create(compte: Compte): void {
    console.log(compte);//ajout H 01/7
    this.http
      .post<Compte>(environment.apiUrl + '/compte', compte)
      .subscribe((resp) => {
        this.load();
      });
  }  */

      //H 20h
      create(compte: Compte): void {
        // Obtenez l'ID de l'utilisateur connecté à partir du service d'authentification
        const userId = this.authService.getUserId();
        // Associez l'ID de l'utilisateur au compte
        compte.utilisateur = {id:userId};

        this.http
        .post<Compte>(environment.apiUrl + '/compte', compte)
        .subscribe(() => this.load()); // Modifié pour appeler load() après la création
      }
    

  // H 3/7 19h
  update(compte: Compte): void {
    this.http
    .put<Compte>(environment.apiUrl + '/compte/' + compte.id, compte)
    .subscribe(() => this.load()); // Modifié pour appeler load() après la mise à jour
  }

  /* update(compte: Compte): void {
    this.http
      .put<Compte>(environment.apiUrl + '/compte/' + compte.id, compte)
      .subscribe((resp) => {
        this.load();
      });
  }  */

  delete(id?: string): void {
    this.http
      .delete<void>(environment.apiUrl + '/compte/' + id)
      .subscribe((resp) => {
        this.load();
      });
  } 

  //les comptes d'un utilisateur
  findByUserId(userId: string): Observable<Compte[]> {
    return this.http.get<Compte[]>(environment.apiUrl + '/compte/user/' + userId);
  }

}
