import { Injectable } from '@angular/core';
import { Note } from '../model/model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../env/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GestionNoteHttpService {

  private notes: Note[] = new Array<Note>();
  // Ajout d'un Subject pour émettre les mises à jour de la liste des comptes H 3/7
  private notesUpdated = new Subject<Note[]>();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // méthode pour obtenir l'Observable du Subject H 3/7 18h
  getNotesUpdated() {
    return this.notesUpdated.asObservable();
  }

  /* load() {
    let obs: Observable<Note[]> = this.http.get<Note[]>(
      environment.apiUrl + '/note'
    );

    obs.subscribe((resp) => {
      this.notes = resp;
    });
  }
 */

  // H 3/7 20h
  load() {
    // Obtenez l'ID de l'utilisateur connecté à partir du service d'authentification
    const userId = this.authService.getUserId();

    this.http.get<Note[]>(environment.apiUrl + '/note/user/' + userId).subscribe((resp) => {
      this.notes = resp;
      this.notesUpdated.next([...this.notes]);
    });
  }

  loadByNom(nom: string) {
    if (nom) {
      this.http
        .get<Note[]>(environment.apiUrl + '/note/by-name/' + nom)
        .subscribe((resp) => {
          this.notes = resp;
          this.notesUpdated.next([...this.notes]); // MAJ tableau après la recherche 19h25

        });
    } else {
      this.load();
    }
  }

  findAll(): Note[] {
    return this.notes;
  }

  findById(id?: string): Observable<Note> {
    return this.http.get<Note>(environment.apiUrl + '/note/' + id);
  }

/*   create(note: Note): void {
    this.http
      .post<Note>(environment.apiUrl + '/note', note)
      .subscribe((resp) => {
        this.load();
      });
  } */

  //H 20h
  create(note: Note): void {
    // Obtenez l'ID de l'utilisateur connecté à partir du service d'authentification
    const userId = this.authService.getUserId();
    // Associez l'ID de l'utilisateur a la note
    note.utilisateur = {id:userId};

    this.http
    .post<Note>(environment.apiUrl + '/note', note)
    .subscribe(() => this.load()); // Modifié pour appeler load() après la création
  }

/*   update(note: Note): void {
    this.http
      .put<Note>(environment.apiUrl + '/note/' + note.id, note)
      .subscribe((resp) => {
        this.load();
      });
  } */
  // H 3/7 19h
  update(note: Note): void {
      this.http
      .put<Note>(environment.apiUrl + '/note/' + note.id, note)
      .subscribe(() => this.load()); // Modifié pour appeler load() après la mise à jour
  }

  delete(id?: string): void {
    this.http
      .delete<void>(environment.apiUrl + '/note/' + id)
      .subscribe((resp) => {
        this.load();
      });
  }

    //les notes d'un utilisateur
    findByUserId(userId: string): Observable<Note[]> {
      return this.http.get<Note[]>(environment.apiUrl + '/note/user/' + userId);
    }
}
