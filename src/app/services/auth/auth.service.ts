import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: IUser) {
    let users: IUser[] = JSON.parse(localStorage.getItem('Users') || '[]');

    return users.find(
      parameter => parameter.email === user.email && parameter.password === user.password
    );
  }
}
