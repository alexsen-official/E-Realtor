import { Injectable }  from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() { }

  getError(control: FormControl, label: string = 'This field') {
    const errors = control.errors;

    if (errors && control.touched) {
      const firstError = Object.keys(errors.valueOf())[0];

      switch (firstError) {
        case 'required':
          return `${ label } is required!`;

        case 'email':
          return `${ label } has wrong email format!`;

        case 'pattern':
          return `${ label } has wrong pattern!`;

        case 'minlength':
          return `${ label } must contain at least ${ control.getError('minlength')['requiredLength'] } characters!`;

        case 'maxlength':
          return `${ label } must not be longer than ${ control.getError('maxlength')['requiredLength'] } characters!`;

        case 'min':
          return `${ label } can not be less than ${ control.getError('min')['min'] }!`;

        case 'max':
          return `${ label } can not be greater than ${ control.getError('max')['max'] }!`;
      }
    }

    return null;
  }
}
