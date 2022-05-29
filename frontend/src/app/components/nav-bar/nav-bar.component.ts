import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService, UserService }              from '../../services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input()  title!: string;
  @Output() drawerToggle = new EventEmitter();

  constructor(private readonly _user : UserService,
              private readonly _theme: ThemeService) { }

  get token()       { return this._user.token;        }
  get isDarkTheme() { return this._theme.isDarkTheme; }

  logoutUser   = () => this._user.logout();
  reverseTheme = () => this._theme.reverseTheme();
}
