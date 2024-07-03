import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/environment'; //à mettre environnement-prod
import { Utilisateur } from '../model/model';
import { InscriptionUtilisateurResponse } from '../model/inscription-utilisateur-response';
import { BehaviorSubject, Observable } from 'rxjs'; // Modification : Ajout de BehaviorSubject pour suivre l'état de connexion
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private utilisateur?: Utilisateur = undefined;
  
  // Modification : Ajout de BehaviorSubject pour suivre l'état de connexion
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    // Vérifiez l'état de connexion lors de l'initialisation
    const savedUserItem = sessionStorage.getItem('currentUser');
    if (savedUserItem !== null) {
      const savedUser = JSON.parse(savedUserItem);
      this.utilisateur = savedUser;
      this.loggedIn.next(true);
    }
    /* const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      this.getUserById(savedUserId).subscribe((user) => {
        this.utilisateur = user;
        this.loggedIn.next(true);
      });
    } */
  }

  // méthode pour obtenir l'état de connexion
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(email: string, motDePasse: string) {
    this.http
      .post<InscriptionUtilisateurResponse>(environment.apiUrl + '/utilisateur/connexion', {
        email: email, //email de gauche vient du back API
        motDePasse: motDePasse,
      })
      .subscribe((resp) => {
        
        this.utilisateur = resp;

        // Enregistrez l'id de l'utilisateur connecté dans le localStorage
        //localStorage.setItem('currentUserId', resp.id);
        sessionStorage.setItem('currentUser', JSON.stringify(resp));

        // Mettre à jour l'état de connexion
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
    // Supprimez l'id de l'utilisateur connecté du localStorage
    sessionStorage.removeItem('currentUserId');

    // Supprimez également l'utilisateur actuel du localStorage
    sessionStorage.removeItem('currentUser');

    this.utilisateur = undefined;
    // Modification : Mettre à jour l'état de connexion
    this.loggedIn.next(false);
  }

  isLogged(): boolean {
    return this.utilisateur != undefined;
  }

  getUserById(id: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(environment.apiUrl + '/api/utilisateur/' + id);
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

