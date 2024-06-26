import { Injectable } from '@angular/core';
import { Note } from '../model/model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class GestionNoteHttpService {
  private notes: Note[] = new Array<Note>();

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    let obs: Observable<Note[]> = this.http.get<Note[]>(
      environment.apiUrl + '/note'
    );

    obs.subscribe((resp) => {
      this.notes = resp;
    });
  }

  loadByTitle(title: string) {
    if (title) {
      this.http
        .get<Note[]>(environment.apiUrl + '/note/by-title/' + title)
        .subscribe((resp) => {
          this.notes = resp;
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

  create(note: Note): void {
    this.http
      .post<Note>(environment.apiUrl + '/note', note)
      .subscribe((resp) => {
        this.load();
      });
  }

  update(note: Note): void {
    this.http
      .put<Note>(environment.apiUrl + '/note/' + note.id, note)
      .subscribe((resp) => {
        this.load();
      });
  }

  delete(id?: string): void {
    this.http
      .delete<void>(environment.apiUrl + '/note/' + id)
      .subscribe((resp) => {
        this.load();
      });
  }
}
