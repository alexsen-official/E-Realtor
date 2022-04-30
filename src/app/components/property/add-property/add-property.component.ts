import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  SnackBarService,
  PropertyService,
  ValidationErrorService
} from '../../../services';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {
  readonly minNameLength: number = 5;
  readonly maxNameLength: number = 32;

  readonly maxDescriptionLength: number = 1024;

  // TODO: Property types and furnishing types must come from masters
  propertyTypes: string[] = [
    'House',
    'Flat',
    'Duplex'
  ];

  furnishingTypes: string[] = [
    'Fully furnished',
    'Semi furnished',
    'Unfurnished'
  ];

  addPropertyForm: FormGroup = this._formBuilder.group({
    basicInfo: this._formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.minLength(this.minNameLength),
        Validators.maxLength(this.maxNameLength)
      ]],

      city: [null, Validators.required],
      propertyType: [this.propertyTypes[0], Validators.required],
      furnishingType: [this.furnishingTypes[0], Validators.required],

      BHK: [null, [
        Validators.required,
        Validators.pattern(/^\d*$/),
        Validators.min(1)
      ]],

      forSell: [null, Validators.required]
    }),

    pricingAndArea: this._formBuilder.group({
      price: [null, [
        Validators.required,
        Validators.pattern(/^\d*$/),
        Validators.min(0)
      ]],

      security: [null, [
        Validators.pattern(/^\d*$/),
        Validators.min(0)
      ]],

      maintenance: [null, [
        Validators.pattern(/^\d*$/),
        Validators.min(0)
      ]],

      builtArea: [null, [
        Validators.pattern(/^\d*$/),
        Validators.min(0)
      ]],

      carpetArea: [null, [
        Validators.required,
        Validators.pattern(/^\d*$/),
        Validators.min(0)
      ]]
    }),

    location: this._formBuilder.group({
      address: [null, Validators.required],

      floor: [null, [
        Validators.pattern(/^\d*$/),
        Validators.min(1),
        Validators.max(128)
      ]],

      totalFloor: [null, [
        Validators.pattern(/^\d*$/),
        Validators.min(1),
        Validators.max(128)
      ]],

      landmark: [null, null]
    }),

    otherDetails: this._formBuilder.group({
      readyToMove: [null, Validators.required],
      possession: [null, null],

      age: [null, [
        Validators.pattern(/^\d*$/),
        Validators.min(0)
      ]],

      gatedCommunity: [null, null],
      mainEntrance: [null, Validators.required],
      description: [null, Validators.maxLength(this.maxDescriptionLength)]
    }),

    photos: this._formBuilder.group({})
  });

  // region Getters
  get basicInfo() {
    return this.addPropertyForm.get('basicInfo') as FormGroup;
  }

  get pricingAndArea() {
    return this.addPropertyForm.get('pricingAndArea') as FormGroup;
  }

  get location() {
    return this.addPropertyForm.get('location') as FormGroup;
  }

  get otherDetails() {
    return this.addPropertyForm.get('otherDetails') as FormGroup;
  }

  get photos() {
    return this.addPropertyForm.get('photos') as FormGroup;
  }

  get name() {
    return this.basicInfo.get('name') as FormControl;
  }

  get city() {
    return this.basicInfo.get('city') as FormControl;
  }

  get propertyType() {
    return this.basicInfo.get('propertyType') as FormControl;
  }

  get furnishingType() {
    return this.basicInfo.get('furnishingType') as FormControl;
  }

  get BHK() {
    return this.basicInfo.get('BHK') as FormControl;
  }

  get forSell() {
    return this.basicInfo.get('forSell') as FormControl;
  }

  get price() {
    return this.pricingAndArea.get('price') as FormControl;
  }

  get security() {
    return this.pricingAndArea.get('security') as FormControl;
  }

  get maintenance() {
    return this.pricingAndArea.get('maintenance') as FormControl;
  }

  get builtArea() {
    return this.pricingAndArea.get('builtArea') as FormControl;
  }

  get carpetArea() {
    return this.pricingAndArea.get('carpetArea') as FormControl;
  }

  get address() {
    return this.location.get('address') as FormControl;
  }

  get floor() {
    return this.location.get('floor') as FormControl;
  }

  get totalFloor() {
    return this.location.get('totalFloor') as FormControl;
  }

  get landmark() {
    return this.location.get('landmark') as FormControl;
  }

  get readyToMove() {
    return this.otherDetails.get('readyToMove') as FormControl;
  }

  get possession() {
    return this.otherDetails.get('possession') as FormControl;
  }

  get age() {
    return this.otherDetails.get('age') as FormControl;
  }

  get gatedCommunity() {
    return this.otherDetails.get('gatedCommunity') as FormControl;
  }

  get mainEntrance() {
    return this.otherDetails.get('mainEntrance') as FormControl;
  }

  get description() {
    return this.otherDetails.get('description') as FormControl;
  }
  // endregion

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              private readonly _snackBar: SnackBarService,
              private readonly _propertyService: PropertyService,
              private readonly _validationError: ValidationErrorService) { }

  onSubmit(): void {
    if (this.addPropertyForm.valid) {
      this._propertyService.addProperty(this.addPropertyForm.value);

      if (this.forSell) {
        this._router.navigate(['/rent-property']).then();
      }
      else {
        this._router.navigate(['/']).then();
      }

      this._snackBar.open('You have successfully added the property!');
    }
    else {
      this._snackBar.open('Kindly provide all required fields!');
    }
  }

  getErrorMessage(formControl: FormControl, fieldName: string): string | null {
    return this._validationError.getErrorMessage(formControl, fieldName);
  }
}
