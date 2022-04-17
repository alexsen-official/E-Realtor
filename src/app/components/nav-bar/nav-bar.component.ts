import { Component } from '@angular/core';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user: string | null = null;

  constructor(private readonly _snackBar: SnackBarService) { }

  loggedId(): string | null {
    return this.user = localStorage.getItem('token');
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this._snackBar.open('You have successfully logged out!');
  }
}
