import { HttpClient }      from '@angular/common/http';
import { Injectable }      from '@angular/core';
import { environment }     from '../../environments/environment';
import { IUser }           from '../interfaces';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient,
              private readonly _snackBar: SnackBarService) { }

  get token() { return JSON.parse(localStorage.getItem('token') || 'null') as IUser; }

  get(id: string) {
    return this._http.get<IUser>(`${ this.apiUrl }/users/${ id }`);
  }

  getAll() {
    return this._http.get<IUser[]>(`${ this.apiUrl }/users`);
  }

  create(user: IUser) {
    return this._http.post<IUser>(`${ this.apiUrl }/users`, user);
  }

  login(user: IUser) {
    return this._http.post<IUser>(`${ this.apiUrl }/users/login`, user);
  }

  update(user: IUser) {
    return this._http.put<IUser>(`${ this.apiUrl }/users`, user);
  }

  delete(id: string) {
    return this._http.delete<IUser>(`${ this.apiUrl }/users/${ id }`);
  }

  logout() {
    localStorage.removeItem('token');
    this._snackBar.open('You have successfully logged out!');
  }
}
