import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { AuthService } from '../../../services/auth/auth.service';
import { SnackBarService } from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  minPasswordLength: number = 8;

  // region Getters
  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  // endregion

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              private readonly _authService: AuthService,
              private readonly _snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.email
      ]],

      password: [null, [
        Validators.required,
        Validators.minLength(this.minPasswordLength)
      ]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const token = this._authService.authUser(this.loginForm.value);

      if (token) {
        localStorage.setItem('token', token.name);

        this._router.navigate(['/']).then();
        this._snackBar.open('You have successfully logged in!');
      }
      else {
        this._snackBar.open('Invalid email address or password!');
      }
    }
    else {
      this._snackBar.open('Kindly provide all required fields!');
    }
  }
}
