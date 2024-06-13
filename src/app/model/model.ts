//Classe User du projet java Backend
export class Utilisateur {
  constructor(
    public id?: string,
    public nom?: string,
    public dateDeNaissance?: string,
    public email?: string,
    public motDePasse?: string,
    public confirmMotDePasse?: string
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
    public id?: string,
    public nom?: string,
    public description?: string,
    public dateAjout?: string,
    public dateMAJ?: string,
    public nomUtilisateurPlateforme?: string,
    public urlPlateforme?: string,
    public valeurMotdePassePlateforme?: string,
    public cle?: string
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
    public id?: string,
    public nom?: string,
    public description?: string,
    public dateAjout?: string,
    public dateModif?: string,
    public contenu?: string
  ) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.dateAjout = dateAjout;
    this.dateModif = dateModif;
    this.contenu = contenu;
  }
}