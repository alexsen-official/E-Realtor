import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorService {
  constructor() { }

  getErrorMessage(formControl: FormControl, fieldName: string = 'This field'): string | null {
    const errors = formControl.errors;

    if (errors && formControl.touched) {
      const firstError = Object.keys(errors.valueOf())[0];

      switch (firstError) {
        case 'required':
          return `${ fieldName } is required!`;

        case 'email':
          return `${ fieldName } has wrong email format!`;

        case 'pattern':
          return `${ fieldName } has wrong pattern!`;

        case 'minlength':
          return `${ fieldName } must contain at least ${ formControl.getError('minlength')['requiredLength'] } characters!`;

        case 'maxlength':
          return `${ fieldName } must not be longer than ${ formControl.getError('maxlength')['requiredLength'] } characters!`;

        case 'min':
          return `${ fieldName } can not be less than ${ formControl.getError('min')['min'] }!`;

        case 'max':
          return `${ fieldName } can not be greater than ${ formControl.getError('max')['max'] }!`;
      }
    }

    return null;
  }
}
