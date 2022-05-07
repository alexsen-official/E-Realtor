import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUser } from '../interfaces';
import { SnackBarService } from './snack-bar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get token() {
    return localStorage.getItem('token');
  }

  constructor(private readonly _http: HttpClient,
              private readonly _snackBar: SnackBarService,
              private readonly _router: Router) { }

  addUser(user: IUser): Observable<IUser> {
    return this._http.post<IUser>('http://localhost:3000/users', user);
  }

  findUser(user: IUser): Observable<IUser | undefined> {
    return this._http
      .get<IUser[]>('http://localhost:3000/users')
      .pipe(map(
        users => users.find(
          token => token.email === user.email
                && token.password === user.password
        )
      ));
  }

  registerUser(user: IUser): void {
    this.addUser(user).subscribe(
      token => this.loginUser(token),
      error => console.error(error)
    );
  }

  loginUser(user: IUser): void {
    this.findUser(user).subscribe(
      token => {
        if (token) {
          localStorage.setItem('token', token.name);

          this._router.navigate(['/']).then();
          this._snackBar.open('You have successfully logged in!');
        }
        else {
          this._snackBar.open('Invalid email address or password!');
        }
      },
      error => console.error(error)
    )
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._snackBar.open('You have successfully logged out!');
  }
}
