import { Component, Input } from '@angular/core';
import { SnackBarService, ThemeService } from '../../services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() title!: string;

  token: string | null = null;

  get isDarkTheme() {
    return this._theme.isDarkTheme;
  }

  constructor(private readonly _snackBar: SnackBarService,
              private readonly _theme: ThemeService) { }

  reverseTheme(): void {
    this._theme.reverseTheme();
  }

  loggedId(): string | null {
    return this.token = localStorage.getItem('token');
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this._snackBar.open('You have successfully logged out!');
  }
}
