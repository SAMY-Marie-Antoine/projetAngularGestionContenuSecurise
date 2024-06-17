import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../model/model';

@Component({
  selector: 'navbar, [navbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isLoggedIn: boolean = false;
 
  searchQuery: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Modification : Abonnement à isLoggedIn
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });  
  }

  toggleLogin() {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.router.navigate(['/home']);
    } else {
      this.goToLogin();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  } 

  showUtilisateur(): string {
    const utilisateur = this.authService.getUtilisateur();
    if(utilisateur && utilisateur.nom) {
      return utilisateur.nom;
    }

    return "";
  }

  

  /* onSearch() {
    console.log('Recherche :', this.searchQuery);
    // Implémentez ici la logique de recherche
  } */
}
