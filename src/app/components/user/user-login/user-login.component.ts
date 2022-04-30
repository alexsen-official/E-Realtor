import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  UserService,
  SnackBarService,
  ValidationErrorService
} from '../../../services';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm: FormGroup = this._formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              private readonly _userService: UserService,
              private readonly _snackBar: SnackBarService,
              private readonly _validationError: ValidationErrorService) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this._userService
        .authUser(this.loginForm.value)
        .subscribe(
          user => {
            if (user) {
              localStorage.setItem('token', user.name);

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
    else {
      this._snackBar.open('Kindly provide all required fields!');
    }
  }

  getErrorMessage(formControl: FormControl, fieldName: string): string | null {
    return this._validationError.getErrorMessage(formControl, fieldName);
  }
}
