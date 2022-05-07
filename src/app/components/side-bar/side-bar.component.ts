import { Component } from '@angular/core';
import { UserService} from '../../services';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  get token() {
    return this._userService.token;
  }

  constructor(private readonly _userService: UserService) { }

  onLogout(): void {
    this._userService.logoutUser();
  }
}
