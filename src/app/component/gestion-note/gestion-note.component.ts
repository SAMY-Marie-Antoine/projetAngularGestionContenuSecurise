import { Component } from '@angular/core';
import { Note } from '../../model/model';
import { Router } from '@angular/router';
import { GestionNoteHttpService } from '../../services/gestion-note-http.service';

@Component({
  selector: 'gestion-note, [gestion-note]',
  templateUrl: './gestion-note.component.html',
  styleUrl: './gestion-note.component.css',
})
export class GestionNoteComponent {
  recherche: string = '';

  gestionNoteForm?: Note;

  constructor(
    private router: Router,
    private gestionNoteHttpService: GestionNoteHttpService
  ) {}

  save() {
    if (this.gestionNoteForm) {
      if (this.gestionNoteForm?.id) {
        // modification
        this.gestionNoteHttpService.update(this.gestionNoteForm);
      } else {
        // création
        this.gestionNoteHttpService.create(this.gestionNoteForm);
      }
    }

    this.gestionNoteForm = undefined;
  }

  list(): Array<Note> {
    return this.gestionNoteHttpService.findAll();
  }

  search(rech: string) {
    // Met à jour la propriété 'recherche' avec la nouvelle valeur
    this.recherche = rech;
    this.gestionNoteHttpService.loadByNom(rech);
  }

  goToDetail(id?: string) {
    this.router.navigate(['/note', id]);
  }

  add() {
    this.gestionNoteForm = new Note();
  }

  edit(id?: string) {
    this.gestionNoteHttpService
      .findById(id)
      .subscribe((response: Note | undefined) => {
        this.gestionNoteForm = response;
      });
  }

  remove(id?: string) {
    this.gestionNoteHttpService.delete(id);
  }

  cancel() {
    this.gestionNoteForm = undefined;
  }
}
