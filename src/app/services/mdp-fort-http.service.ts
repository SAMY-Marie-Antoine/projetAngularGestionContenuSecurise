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
}
