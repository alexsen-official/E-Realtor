import { Component }                                       from '@angular/core';
import { FormBuilder, FormControl, Validators }            from '@angular/forms';
import { Router }                                          from '@angular/router';
import { SnackBarService, UserService, ValidationService } from '../../../services';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  loginForm = this._formBuilder.group({
    email:    [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });

  isLoading = false;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router     : Router,
              private readonly _user       : UserService,
              private readonly _validation : ValidationService,
              private readonly _snackBar   : SnackBarService) { }

  get email()    { return this.loginForm.get('email') as FormControl;    }
  get password() { return this.loginForm.get('password') as FormControl; }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this._user
          .login(this.loginForm.value)
          .subscribe(
            token => {
              this.isLoading = false;
              localStorage.setItem('token', JSON.stringify(token));

              this._router.navigate(['/']).then();
              this._snackBar.open('You have successfully logged in!');
            },
            _ => {
              this.isLoading = false;
              this._snackBar.open('Invalid email or password!');
            }
          );
    }
  }

  getError(control: FormControl, label: string) {
    return this._validation.getError(control, label);
  }

  isVisible(input: HTMLInputElement) {
    return input.type === 'password';
  }

  toggleVisibility(input: HTMLInputElement) {
    if (this.isVisible(input))
      input.type = 'text';
    else
      input.type = 'password';
  }
}
