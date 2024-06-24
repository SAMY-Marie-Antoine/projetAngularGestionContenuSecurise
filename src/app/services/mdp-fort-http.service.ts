import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root'
})
export class MdpFortHttpService {


  constructor(private http: HttpClient) { 
  }

  // Méthode pour générer un mot de passe fort
  generateMotDePasseFort(): Observable<string> {
    //serveur renvoie une chaîne de caractères (qui est le mot de passe fort)
    //avec text angular sera que la réponse sera une chaîne de caractères et non du JSON
    return this.http.post<string>(environment.apiVerifUrl + '/verification/generateMotDePasseFort', {}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    });
  }

  // Méthode pour tester la robustesse d'un mot de passe
  testerMotDePasse(motDePasse: string): Observable<boolean> {
    // Envoie le mot de passe à l'API et attend une réponse de type boolean
    return this.http.post<boolean>(environment.apiVerifUrl + '/verification/mot-de-passe/force', motDePasse, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json'
    });
  }

  // Méthode pour vérifier si un mot de passe a été compromis
  verifierMotDePasse(motDePasse: string): Observable<boolean> {
    // Envoie le mot de passe à l'API et attend une réponse de type boolean
    return this.http.post<boolean>(environment.apiVerifUrl + '/verification/mot-de-passe/compromis', motDePasse, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json'
    });
  }


}
