import { Component } from '@angular/core';
import { Compte } from '../../model/model';
import { CompteHttpService } from '../../services/compte-http.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css',
})
export class CompteComponent {
  compte?: Compte;
  compteForm!: FormGroup;

  nomCtrl!: FormControl;
  descriptionCtrl!: FormControl;
  emailCtrl!: FormControl;
  dateAjoutCtrl!: FormControl;
  dateMAJCtrl!: FormControl;
  nomUtilisateurPlateformeCtrl!: FormControl;
  urlPlateformeCtrl!: FormControl;
  valeurMotdePassePlateformeCtrl!: FormControl;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private compteHttpService: CompteHttpService
  ) {
    this.nomCtrl = this.formBuilder.control('', Validators.required);
    this.descriptionCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(1),
    ]);
    this.dateAjoutCtrl = this.formBuilder.control('', Validators.required);
    this.dateMAJCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.maxLength(10),
    ]);

    this.nomUtilisateurPlateformeCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(9),
    ]);
    this.urlPlateformeCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(9),
    ]);
    this.valeurMotdePassePlateformeCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(9),
    ]);
    this.compteForm = this.formBuilder.group({
      nom: this.nomCtrl,
      description: this.descriptionCtrl,
      dateAjout: this.dateAjoutCtrl,
      dateMAJ: this.dateMAJCtrl,
      nomUtilisateurPlateforme: this.nomUtilisateurPlateformeCtrl,
      urlPlateforme: this.urlPlateformeCtrl,
      valeurMotdePassePlateforme: this.valeurMotdePassePlateformeCtrl,
    });
  }

  inscription() {
    if (this.compteForm) {
      if (this.compte?.id) {
        this.compteHttpService.create(this.compte);
      }
      this.compte = undefined;
    }
  }
}
