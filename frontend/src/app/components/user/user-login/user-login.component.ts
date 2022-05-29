import { Component }                            from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService, ValidationService }       from '../../../services';

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

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _user       : UserService,
              private readonly _validation : ValidationService) { }

  get email()    { return this.loginForm.get('email') as FormControl;    }
  get password() { return this.loginForm.get('password') as FormControl; }

  onSubmit() {
    if (this.loginForm.valid)
      this._user.login(this.loginForm.value);
  }

  getError(control: FormControl, label: string) {
    return this._validation.getError(control, label);
  }
}
