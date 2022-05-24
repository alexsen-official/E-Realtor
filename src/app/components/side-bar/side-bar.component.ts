import { Component }   from '@angular/core';
import { UserService } from '../../services';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  constructor(private readonly _user: UserService) { }

  get token() { return this._user.token; }

  logoutUser = () => this._user.logout();
}
