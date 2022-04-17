import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { IProperty } from '../../../interfaces/property.interface';

import { SnackBarService } from '../../../services/snack-bar/snack-bar.service';
import { HousingService } from '../../../services/housing/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm!: FormGroup;

  propertyPreview: IProperty = {
    id: NaN,

    // Basic info
    name: '',
    city: '',
    propertyType: '',
    furnishingType: '',
    BHK: NaN,
    forSell: false,

    // Pricing and area
    price: NaN,
    carpetArea: NaN,

    // Location
    address: '',

    // Other details
    readyToMove: false,
    mainEntrance: ''
  };

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

  // region Getters
  // Basic info
  get basicInfo() {
    return this.addPropertyForm.get('basicInfo') as FormGroup;
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

  // Pricing and area
  get pricingAndArea() {
    return this.addPropertyForm.get('pricingAndArea') as FormGroup;
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

  // Location
  get location() {
    return this.addPropertyForm.get('location') as FormGroup;
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

  // Other details
  get otherDetails() {
    return this.addPropertyForm.get('otherDetails') as FormGroup;
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

  // Photos
  get photos() {
    return this.addPropertyForm.get('photos') as FormGroup;
  }
  // endregion

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router: Router,
              private readonly _snackBar: SnackBarService,
              private readonly _housingService: HousingService) { }

  ngOnInit(): void {
    this.addPropertyForm = this._formBuilder.group({
      basicInfo: this._formBuilder.group({
        name:           [null, [Validators.required]],
        city:           [null, [Validators.required]],
        propertyType:   [this.propertyTypes[0], [Validators.required]],
        furnishingType: [this.furnishingTypes[0], [Validators.required]],
        BHK:            [null, [Validators.required]],
        forSell:        [null, [Validators.required]]
      }),

      pricingAndArea: this._formBuilder.group({
        price:       [null, [Validators.required]],
        security:    [null, null],
        maintenance: [null, null],
        builtArea:   [null, null],
        carpetArea:  [null, [Validators.required]]
      }),

      location: this._formBuilder.group({
        address:    [null, [Validators.required]],
        floor:      [null, null],
        totalFloor: [null, null],
        landmark:   [null, null]
      }),

      otherDetails: this._formBuilder.group({
        readyToMove:    [null, [Validators.required]],
        possession:     [null, [Validators.required]],
        age:            [null, null],
        gatedCommunity: [null, [Validators.required]],
        mainEntrance:   [null, [Validators.required]],
        description:    [null, null]
      }),

      photos: this._formBuilder.group({

      }),
    });
  }

  onChange(): void {
    this.propertyPreview = {
      id: this.propertyPreview.id,

      // Basic info
      name: this.name.value,
      city: this.city.value,
      propertyType: this.propertyType.value,
      furnishingType: this.furnishingType.value,
      BHK: this.BHK.value,
      forSell: this.forSell.value,

      // Pricing and area
      price: this.price.value,
      security: this.security.value,
      maintenance: this.maintenance.value,
      builtArea: this.builtArea.value,
      carpetArea: this.carpetArea.value,

      // Location
      address: this.address.value,
      floor: this.floor.value,
      totalFloor: this.totalFloor.value,
      landmark: this.landmark.value,

      // Other details
      readyToMove: this.readyToMove.value,
      possession: this.possession.value,
      age: this.age.value,
      gatedCommunity: this.gatedCommunity.value,
      mainEntrance: this.mainEntrance.value,
      description: this.description.value
    };
  }

  onSubmit(): void {
    if (this.addPropertyForm.valid) {
      this._housingService.addProperty(this.propertyPreview);

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
}
