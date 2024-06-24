import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/environment'; //à mettre environnement-prod
import { Utilisateur } from '../model/model';
import { BehaviorSubject, Observable } from 'rxjs'; // Modification : Ajout de BehaviorSubject pour suivre l'état de connexion
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private utilisateur?: Utilisateur = undefined;

  // Modification : Ajout de BehaviorSubject pour suivre l'état de connexion
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  // Modification : Ajout d'une méthode pour obtenir l'état de connexion
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(email: string, motDePasse: string) {
    this.http
      .post<Utilisateur>(environment.apiUrl + '/utilisateur/connexion', {
        email: email, //email de gauche vient du back API
        motDePasse: motDePasse,
      })
      .subscribe((resp) => {
        this.utilisateur = resp;

        // Modification : Mettre à jour l'état de connexion
        this.loggedIn.next(true);

        this.router.navigate(['/home']);
      });
  }
  
  signUp(
    nom: string,
    dateDeNaissance: Date,
    email: string,
    motDePasse: string,
    confirmMotDePasse: string
  ) {
    this.http
      .post<Utilisateur>(environment.apiUrl + '/utilisateur/inscription', {
        nom: nom,
        dateDeNaissance: dateDeNaissance,
        email: email,
        motDePasse: motDePasse,
        confirmMotDePasse: confirmMotDePasse,
      })
      .subscribe((resp) => {
        this.utilisateur = resp;

        this.router.navigate(['/utilisateur/connexion']);
      });
  }

  logout() {
    this.utilisateur = undefined;
    // Modification : Mettre à jour l'état de connexion
    this.loggedIn.next(false);
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

  sendPasswordResetLink(email: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/utilisateur/forgot-password', { email });
  }

  // gérer la réinitialisation du mot de passe
  resetPassword(resetToken: string, newPassword: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/utilisateur/reset-password', { resetToken, newPassword });
  }
  
}
