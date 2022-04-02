import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { IUser } from '../../../interfaces/user.interface';

import { UserService } from '../../../services/user/user.service';
import { SnackBarService } from '../../../services/snack-bar/snack-bar.service';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  Validators,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  registrationForm!: FormGroup;

  user!: IUser;

  minNameLength: number = 5;
  maxNameLength: number = 32;

  phoneLength: number = 10;

  minPasswordLength: number = 8;

  get name() {
    return this.registrationForm.get('name') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get phone() {
    return this.registrationForm.get('phone') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  constructor(private _formBuilder: FormBuilder,
              private _userService: UserService,
              private _snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.registrationForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(this.minNameLength), Validators.maxLength(this.maxNameLength)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(this.phoneLength), Validators.maxLength(this.phoneLength)]],
      password: [null, [Validators.required, Validators.minLength(this.minPasswordLength)]],
      confirmPassword: [null, Validators.required]
    }, { validators: this.passwordMatchingValidator })
  }

  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    if (control.get('password')?.value === control.get('confirmPassword')?.value) {
      return null;
    }

    return { passwordsMismatch: true };
  }

  getUserData(): IUser {
    return this.user = {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value,
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this._userService.addUser(this.getUserData());

      this.registrationForm.reset();
      this.formDirective.resetForm();

      this._snackBarService.openSnackBar('You have successfully registered!');
    }
    else {
      this._snackBarService.openSnackBar('Kindly provide all required fields!');
    }
  }
}
