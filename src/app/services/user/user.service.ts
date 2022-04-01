import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  addUser(user: IUser): void {
    let users = JSON.parse(localStorage.getItem('Users') || '[]');

    users.push(user);
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
