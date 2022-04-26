import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly _http: HttpClient) { }

  authUser(user: IUser): Observable<IUser | undefined> {
    return this._http
      .get<IUser[]>('http://localhost:3000/users')
      .pipe(map(
        users => users.find(
          token => token.email === user.email &&
                   token.password === user.password
        )
      ));
  }

  addUser(user: IUser): Observable<IUser> {
    return this._http.post<IUser>('http://localhost:3000/users', user);
  }
}
