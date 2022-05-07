import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService, UserService} from '../../services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() title!: string;
  @Output() drawerToggle = new EventEmitter();

  get token() {
    return this._userService.token;
  }

  get isDarkTheme() {
    return this._theme.isDarkTheme;
  }

  constructor(private readonly _userService: UserService,
              private readonly _theme: ThemeService) { }

  reverseTheme(): void {
    this._theme.reverseTheme();
  }

  onLogout(): void {
    this._userService.logoutUser();
  }
}
