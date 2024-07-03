//Classe User du projet java Backend
export class Utilisateur {
  constructor(
    public id?: string,
    public nom?: string,
    public dateDeNaissance?: Date,
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

  utilisateur?: Utilisateur;//ajout H 01/7
  
  constructor(
    public id?: string,
    public nom?: string,
    public description?: string,
    public dateAjout?: Date,
    public dateMAJ?: Date,
    public nomUtilisateurPlateforme?: string,
    public urlPlateforme?: string,
    public valeurMotdePassePlateforme?: string,
    public cle?: string,
    
    
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

  utilisateur?: Utilisateur;//ajout H 01/7
  
  constructor(
    public id?: string,
    public nom?: string,
    public description?: string,
    public dateAjout?: Date,
    public dateModif?: Date,
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

export class Verification {
  constructor(
    public id?: string,
    public email?: string,
    public motDePasse?: string,
    public forceMotDePasse?: boolean,
    public motDePasseCompromis?:boolean

  ) {
    this.id = id;
    this.email = email;
    this.motDePasse = motDePasse;
    this.forceMotDePasse = forceMotDePasse;
    this.motDePasseCompromis = motDePasseCompromis;
  }
}
