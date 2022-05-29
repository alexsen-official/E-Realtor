import { Injectable } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  duration = 5000;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition  : MatSnackBarVerticalPosition   = 'bottom';

  constructor(private readonly _snackBar: MatSnackBar) { }

  open(message: string, action: string = 'Close') {
    this._snackBar.open(message, action, {
      duration          : this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition  : this.verticalPosition
    });
  }
}
