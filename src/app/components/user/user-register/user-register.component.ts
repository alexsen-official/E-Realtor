import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  AbstractControl,
  FormGroup,
  Validators,
  ValidationErrors
} from '@angular/forms';

import { IUser } from '../../../interfaces/user.interface';

import { UserService } from '../../../services/user/user.service';
import { SnackBarService } from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user!: IUser;

  minNameLength: number = 5;
  maxNameLength: number = 32;

  phoneLength: number = 10;

  minPasswordLength: number = 8;

  // region Getters
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

  get confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  // endregion

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              private readonly _userService: UserService,
              private readonly _snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.minLength(this.minNameLength),
        Validators.maxLength(this.maxNameLength)
      ]],

      email: [null, [
        Validators.required,
        Validators.email
      ]],

      phone: [null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(this.phoneLength),
        Validators.maxLength(this.phoneLength)
      ]],

      password: [null, [
        Validators.required,
        Validators.minLength(this.minPasswordLength)
      ]],

      confirmPassword: [null, [
        Validators.required
      ]]
    },
    {
      validators: [
        this.passwordMatchingValidator
      ]
    })
  }

  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    if (control.get('password')?.value === control.get('confirmPassword')?.value) {
      return null;
    }

    return { passwordsMismatch: true };
  }

  getUser(): IUser {
    return this.user = {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value,
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this._userService.addUser(this.getUser());
      localStorage.setItem('token', this.user.name);

      this._router.navigate(['/']).then();
      this._snackBar.open('You have successfully registered and logged in!');
    }
    else {
      this._snackBar.open('Kindly provide all required fields!');
    }
  }
}
