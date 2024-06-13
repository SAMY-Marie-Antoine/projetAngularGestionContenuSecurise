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
  dateAjoutCtrl!: FormControl;
  dateMAJCtrl!: FormControl;
  nomUtilisateurPlateformeCtrl!: FormControl;
  urlPlateformeCtrl!: FormControl;
  valeurMotdePassePlateformeCtrl!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private compteHttpService: CompteHttpService
  ) {
    this.nomCtrl = this.formBuilder.control('', Validators.required);
    this.descriptionCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(1),
    ]);
    this.dateAjoutCtrl = this.formBuilder.control(
      Validators.required,
      Validators.maxLength(10)
    );
    this.dateMAJCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.maxLength(10),
    ]);

    this.nomUtilisateurPlateformeCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.urlPlateformeCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.valeurMotdePassePlateformeCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(2),
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
    this.compteHttpService.create(
      this.nomCtrl.value,
      this.descriptionCtrl.value,
      this.dateAjoutCtrl.value,
      this.dateMAJCtrl.value,
      this.nomUtilisateurPlateformeCtrl.value,
      this.urlPlateformeCtrl.value,
      this.valeurMotdePassePlateformeCtrl.value
    );
  }
}
