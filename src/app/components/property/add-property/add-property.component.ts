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

import { IPropertyType } from '../../../interfaces/property-type.interface';
import { SnackBarService } from '../../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  addPropertyForm!: FormGroup;

  propertyTypes: IPropertyType[] = [
    {
      id: 1,
      name: 'house',
      icon: 'home'
    },
    {
      id: 2,
      name: 'flat',
      icon: 'domain'
    }
  ];

  minNameLength: number = 5;
  maxNameLength: number = 32;

  minPriceValue: number = 0;

  get name() {
    return this.addPropertyForm.get('name') as FormControl;
  }

  get type() {
    return this.addPropertyForm.get('type') as FormControl;
  }

  get price() {
    return this.addPropertyForm.get('price') as FormControl;
  }

  constructor(private _formBuilder: FormBuilder,
              private _snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.createAddPropertyForm();
  }

  createAddPropertyForm(): void {
    this.addPropertyForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(this.minNameLength), Validators.maxLength(this.maxNameLength)]],
      type: [this.propertyTypes[0], Validators.required],
      price: [null, [Validators.required, Validators.min(this.minPriceValue)]]
    })
  }

  onSubmit(): void {
    if (this.addPropertyForm.valid) {
      this.addPropertyForm.reset();
      this.formDirective.resetForm();

      this._snackBarService.openSnackBar('You have successfully added the property!');
    }
    else {
      this._snackBarService.openSnackBar('Kindly provide all required fields!');
    }
  }
}
