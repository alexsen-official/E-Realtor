import { Component } from '@angular/core';

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
  styleUrls: ['./user-login.component.scss']
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
              private readonly _userService: UserService,
              private readonly _snackBar: SnackBarService,
              private readonly _validationError: ValidationErrorService) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this._userService.loginUser(this.loginForm.value);
    }
    else {
      this._snackBar.open('Kindly provide all required fields!');
    }
  }

  getErrorMessage(formControl: FormControl, fieldName: string): string | null {
    return this._validationError.getErrorMessage(formControl, fieldName);
  }
}
