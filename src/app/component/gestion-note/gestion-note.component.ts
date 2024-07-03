import { Component } from '@angular/core';
import { Note } from '../../model/model';
import { Router } from '@angular/router';
import { GestionNoteHttpService } from '../../services/gestion-note-http.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gestion-note, [gestion-note]',
  templateUrl: './gestion-note.component.html',
  styleUrl: './gestion-note.component.css',
})
export class GestionNoteComponent {
  
  recherche: string = '';
  gestionNoteForm?: Note;
  notes: Note[] = []; // Liste des notes

  constructor(
    private router: Router,
    private gestionNoteHttpService: GestionNoteHttpService,
    private authService: AuthService
  ) {}

  //H 19h
  ngOnInit(): void {
    // Obtenez l'ID de l'utilisateur connecté à partir du service d'authentification
    const userId = this.authService.getUserId(); 
    this.gestionNoteHttpService.getNotesUpdated().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
    this.gestionNoteHttpService.load();
  }

  save() {
    if (this.gestionNoteForm) {
      if (this.gestionNoteForm?.id) {
        // modification de la note existante
        this.gestionNoteForm.dateModif = new Date(); // Mettre à jour la date de modification
        this.gestionNoteHttpService.update(this.gestionNoteForm);
      } else {
        // création d'une nouvelle note
        this.gestionNoteHttpService.create(this.gestionNoteForm);
      }
    }

    this.gestionNoteForm = undefined;
  }

  /* list(): Array<Note> {
    return this.gestionNoteHttpService.findAll();
   
  } */
  get list(): Array<Note> {
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
    // Initialiser le formulaire avec une nouvelle note et les dates du jour
    this.gestionNoteForm = new Note();
    const currentDate = new Date();
    this.gestionNoteForm.dateAjout = currentDate;
    this.gestionNoteForm.dateModif = currentDate;
  }

  /* edit(id?: string) {
    this.gestionNoteHttpService
      .findById(id)
      .subscribe((response: Note | undefined) => {
        this.gestionNoteForm = response;
      });
  } */

      edit(id?: string) {
        this.gestionNoteHttpService
          .findById(id)
          .subscribe((response: Note | undefined) => {
            if (response) {
              this.gestionNoteForm = response;
            }
          });
      }
  
  remove(id?: string) {
    this.gestionNoteHttpService.delete(id);
  }

  cancel() {
    this.gestionNoteForm = undefined;
  }

  // Ajout de vérifications pour éviter les erreurs
  updateDateAjout(event: string) {
    if (this.gestionNoteForm) {
      this.gestionNoteForm.dateAjout = new Date(event);
    }
  }

  updateDateModif(event: string) {
    if (this.gestionNoteForm) {
      this.gestionNoteForm.dateModif = new Date(event);
    }
  }
}
