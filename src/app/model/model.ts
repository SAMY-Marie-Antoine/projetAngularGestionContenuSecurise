//Classe User du projet java Backend
export class Utilisateur {
  constructor(
    private id?: string,
    private nom?: string,
    private dateDeNaissance?: string,
    private email?: string,
    private motDePasse?: string,
    private confirmMotDePasse?: string
  ) {
    this.id = id;
    this.nom = nom;
    this.dateDeNaissance = dateDeNaissance;
    this.email = email;
    this.motDePasse = motDePasse;
    this.confirmMotDePasse = confirmMotDePasse;
  }
}

export class Compte {
  constructor(
    private id?: string,
    private nom?: string,
    private description?: string,
    private dateAjout?: string,
    private dateMAJ?: string,
    private nomUtilisateurPlateforme?: string,
    private urlPlateforme?: string,
    private valeurMotdePassePlateforme?: string,
    private cle?: string
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.dateAjout = dateAjout;
    this.dateMAJ = dateMAJ;
    this.nomUtilisateurPlateforme = nomUtilisateurPlateforme;
    this.urlPlateforme = urlPlateforme;
    this.valeurMotdePassePlateforme = valeurMotdePassePlateforme;
    this.cle = cle;
  }
}
export class Note {
  constructor(
    private id?: string,
    private nom?: string,
    private description?: string,
    private dateAjout?: string,
    private dateModif?: string,
    private contenu?: string
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.dateAjout = dateAjout;
    this.dateModif = dateModif;
    this.contenu = contenu;
  }
}
