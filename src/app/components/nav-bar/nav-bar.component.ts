import {
  Component,
  OnInit
} from '@angular/core';

import { SnackBarService } from '../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  authorizedUser: string | null = null;

  constructor(private _snackBarService: SnackBarService) { }

  ngOnInit(): void { }

  loggedIn() {
    this.authorizedUser = localStorage.getItem('token');
    return this.authorizedUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    this._snackBarService.openSnackBar('You have successfully logged out!');
  }
}
