import { Component, Input } from '@angular/core';
import { SnackBarService } from '../../services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() title!: string;
  token: string | null = null;

  constructor(private readonly _snackBar: SnackBarService) { }

  loggedId(): string | null {
    return this.token = localStorage.getItem('token');
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this._snackBar.open('You have successfully logged out!');
  }
}
