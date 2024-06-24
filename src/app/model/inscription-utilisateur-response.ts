import { Note } from '../model/model';
import { Compte } from '../model/model';


export interface InscriptionUtilisateurResponse {
  id: string;
  nom: string;
  dateDeNaissance: Date; // Utilisez string pour les dates en TypeScript
  email: string;
  motDePasse: string;
  confirmMotDePasse: string;
  forceMotDePasse: boolean;
  notes: Note[];
  comptes: Compte[];
}