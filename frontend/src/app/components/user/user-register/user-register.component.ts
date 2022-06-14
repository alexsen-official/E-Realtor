import { Component }                            from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router }                                          from '@angular/router';
import { SnackBarService, UserService, ValidationService } from '../../../services';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  readonly minNameLength = 4;
  readonly maxNameLength = 32;

  readonly phoneLength = 10;

  readonly maxEmailLength = 320;

  readonly minPasswordLength = 10;
  readonly maxPasswordLength = 128;

  registerForm = this._formBuilder.group({
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

  isLoading = false;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router     : Router,
              private readonly _user       : UserService,
              private readonly _validation : ValidationService,
              private readonly _snackBar   : SnackBarService) { }

  get name()     { return this.registerForm.get('name')     as FormControl; }
  get email()    { return this.registerForm.get('email')    as FormControl; }
  get phone()    { return this.registerForm.get('phone')    as FormControl; }
  get password() { return this.registerForm.get('password') as FormControl; }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      this._user
          .create(this.registerForm.value)
          .subscribe(
            _ => {
              this.isLoading = false;

              this._router.navigate(['/users/login']).then();
              this._snackBar.open('You have successfully registered!');
            },
            _ => {
              this.isLoading = false;
              this._snackBar.open('The user already exists!');
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
