import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  addUser(user: IUser): void {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
}
