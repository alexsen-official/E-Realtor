import { Component }                            from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService, ValidationService }       from '../../../services';

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

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _user       : UserService,
              private readonly _validation : ValidationService) { }

  get name()     { return this.registerForm.get('name')     as FormControl; }
  get email()    { return this.registerForm.get('email')    as FormControl; }
  get phone()    { return this.registerForm.get('phone')    as FormControl; }
  get password() { return this.registerForm.get('password') as FormControl; }

  onSubmit() {
    if (this.registerForm.valid)
      this._user.register(this.registerForm.value);
  }

  getError(control: FormControl, label: string) {
    return this._validation.getError(control, label);
  }
}
