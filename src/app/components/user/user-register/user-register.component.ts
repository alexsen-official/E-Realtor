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
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  readonly minNameLength: number = 5;
  readonly maxNameLength: number = 32;

  readonly phoneLength: number = 10;

  readonly maxEmailLength: number = 320;

  readonly minPasswordLength: number = 10;
  readonly maxPasswordLength: number = 128;

  registerForm: FormGroup = this._formBuilder.group({
    name: [null, [
      Validators.required,
      Validators.minLength(this.minNameLength),
      Validators.maxLength(this.maxNameLength)
    ]],

    email: [null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(this.maxEmailLength)
    ]],

    phone: [null, [
      Validators.required,
      Validators.pattern(/^\d*$/),
      Validators.minLength(this.phoneLength),
      Validators.maxLength(this.phoneLength)
    ]],

    password: [null, [
      Validators.required,
      Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
      Validators.minLength(this.minPasswordLength),
      Validators.maxLength(this.maxPasswordLength)
    ]]
  });

  get name() {
    return this.registerForm.get('name') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get phone() {
    return this.registerForm.get('phone') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              private readonly _userService: UserService,
              private readonly _snackBar: SnackBarService,
              private readonly _validationError: ValidationErrorService) { }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this._userService
        .addUser(this.registerForm.value)
        .subscribe(
          user => localStorage.setItem('token', user.name),
          error => console.error(error)
        );

      this._router.navigate(['/']).then();
      this._snackBar.open('You have successfully registered and logged in!');
    }
    else {
      this._snackBar.open('Kindly provide all required fields!');
    }
  }

  getErrorMessage(formControl: FormControl, fieldName: string): string | null {
    return this._validationError.getErrorMessage(formControl, fieldName);
  }
}
