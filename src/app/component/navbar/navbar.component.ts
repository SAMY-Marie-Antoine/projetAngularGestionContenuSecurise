import { Component } from '@angular/core';

@Component({
  selector: 'navbar, [navbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isLoggedIn: boolean = false;
  userName: string = 'Utilisateur';
  searchQuery: string = '';

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSearch() {
    console.log('Recherche :', this.searchQuery);
    // Implémentez ici la logique de recherche
  }
}
