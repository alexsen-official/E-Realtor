import { HttpClient }      from '@angular/common/http';
import { Injectable }      from '@angular/core';
import { Router }          from '@angular/router';
import { map }             from 'rxjs';
import { IUser }           from '../interfaces';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly _http    : HttpClient,
              private readonly _snackBar: SnackBarService,
              private readonly _router  : Router) { }

  get token() { return JSON.parse(localStorage.getItem('token') || 'null') as IUser; }

  find(user: IUser) {
    return this._http
               .get<IUser[]>('http://localhost:3000/users')
               .pipe(map(users => users.find(
                 token => token.email    === user.email
                          && token.password === user.password
               )));
  }

  add(user: IUser) {
    return this._http.post<IUser>('http://localhost:3000/users', user);
  }

  login(user: IUser) {
    this.find(user).subscribe(
      token => {
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));

          this._router.navigate(['/']).then();
          this._snackBar.open('You have successfully logged in!');
        }
        else {
          this._snackBar.open('Invalid email address or password!');
        }
      },
      error => console.error(error)
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._snackBar.open('You have successfully logged out!');
  }

  register(user: IUser) {
    this.add(user).subscribe(
      token => this.login(token),
      error => console.error(error)
    );
  }
}
