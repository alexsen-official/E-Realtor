import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';
import { SnackBarService } from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  loginForm!: FormGroup;

  minPasswordLength: number = 8;

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private _authService: AuthService,
              private _snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(this.minPasswordLength)]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const token = this._authService.authUser(this.loginForm.value);

      this.loginForm.reset();
      this.formDirective.resetForm();

      if (token) {
        localStorage.setItem('token', token.name);

        this._router.navigate(['/']).then();
        this._snackBarService.openSnackBar('You have successfully logged in!');
      }
      else {
        this._snackBarService.openSnackBar('Invalid email address or password!');
      }
    }
    else {
      this._snackBarService.openSnackBar('Kindly provide all required fields!');
    }
  }
}
