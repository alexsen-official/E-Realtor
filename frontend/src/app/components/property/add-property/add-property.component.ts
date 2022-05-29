import { Component }                                           from '@angular/core';
import { Router }                                              from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators }                  from '@angular/forms';
import { SnackBarService, PropertyService, ValidationService, UserService } from '../../../services';
import { PropertyType, PropertyFurnishing }                                 from '../../../interfaces';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  readonly minTitleLength = 4;
  readonly maxTitleLength = 32;

  readonly minRoomCount = 1;
  readonly maxRoomCount = 64;

  readonly minArea  = 1;
  readonly minPrice = 1;

  readonly minCountryLength = 4;
  readonly maxCountryLength = 64;

  readonly minStateLength = 4;
  readonly maxStateLength = 128;

  readonly minCityLength = 4;
  readonly maxCityLength = 128;

  readonly minStreetLength = 4;
  readonly maxStreetLength = 64;

  readonly minFloor = 0;
  readonly maxFloor = 128;

  readonly minDescriptionLength = 32;
  readonly maxDescriptionLength = 1024;

  readonly propertyTypes      = Object.values(PropertyType);
  readonly propertyFurnishing = Object.values(PropertyFurnishing);

  readonly addForm = this._formBuilder.group({
    main: this._formBuilder.group({
      title: [null, [
        Validators.required,
        Validators.minLength(this.minTitleLength),
        Validators.maxLength(this.maxTitleLength)
      ]],

      type: [this.propertyTypes[0], [
        Validators.required
      ]],

      furnishing: [this.propertyFurnishing[0], [
        Validators.required
      ]],

      rooms: [null, [
        Validators.required,
        Validators.pattern(/^\d*$/),
        Validators.min(this.minRoomCount),
        Validators.max(this.maxRoomCount)
      ]],

      area: [null, [
        Validators.required,
        Validators.pattern(/^\d*$/),
        Validators.min(this.minArea)
      ]],

      price: [null, [
        Validators.required,
        Validators.pattern(/^\d*$/),
        Validators.min(this.minPrice)
      ]]
    }),

    rent: this._formBuilder.group({
      forRent: [false, [Validators.required]],

      available: this._formBuilder.group({
        from: [null, []],
        to:   [null, []]
      })
    }),

    location: this._formBuilder.group({
      country: [null, [
        Validators.required,
        Validators.minLength(this.minCountryLength),
        Validators.maxLength(this.maxCountryLength)
      ]],

      state: [null, [
        Validators.required,
        Validators.minLength(this.minStateLength),
        Validators.maxLength(this.maxStateLength)
      ]],

      city: [null, [
        Validators.required,
        Validators.minLength(this.minCityLength),
        Validators.maxLength(this.maxCityLength)
      ]],

      street: [null, [
        Validators.required,
        Validators.minLength(this.minStreetLength),
        Validators.maxLength(this.maxStreetLength)
      ]],

      floor: [null, [
        Validators.pattern(/^\d*$/),
        Validators.min(this.minFloor),
        Validators.max(this.maxFloor)
      ]]
    }),

    details: this._formBuilder.group({
      description: [null, [
        Validators.minLength(this.minDescriptionLength),
        Validators.maxLength(this.maxDescriptionLength)
      ]],

      images: [[], []]
    })
  });

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _router     : Router,
              private readonly _snackBar   : SnackBarService,
              private readonly _property   : PropertyService,
              private readonly _user       : UserService,
              private readonly _validation : ValidationService) { }

  // region Getters
  get main()        { return this.addForm  .get('main')        as FormGroup;   }
  get rent()        { return this.addForm  .get('rent')        as FormGroup;   }
  get location()    { return this.addForm  .get('location')    as FormGroup;   }
  get details()     { return this.addForm  .get('details')     as FormGroup;   }
  get title()       { return this.main     .get('title')       as FormControl; }
  get type()        { return this.main     .get('type')        as FormControl; }
  get furnishing()  { return this.main     .get('furnishing')  as FormControl; }
  get rooms()       { return this.main     .get('rooms')       as FormControl; }
  get area()        { return this.main     .get('area')        as FormControl; }
  get price()       { return this.main     .get('price')       as FormControl; }
  get forRent()     { return this.rent     .get('forRent')     as FormControl; }
  get available()   { return this.rent     .get('available')   as FormGroup;   }
  get country()     { return this.location .get('country')     as FormControl; }
  get state()       { return this.location .get('state')       as FormControl; }
  get city()        { return this.location .get('city')        as FormControl; }
  get street()      { return this.location .get('street')      as FormControl; }
  get floor()       { return this.location .get('floor')       as FormControl; }
  get description() { return this.details  .get('description') as FormControl; }
  get images()      { return this.details  .get('images')      as FormControl; }

  get token()       { return this._user.token;                                 }
  // endregion

  onSubmit() {
    if (this.addForm.valid) {
      const value = this.addForm.value;

      this._property.add({
        ...value.main,
        ...value.rent,
        ...value.location,
        ...value.details
      }).subscribe(error => console.log(error));

      if (this.forRent.value)
        this._router.navigate(['/']).then();
      else
        this._router.navigate(['/rent-property']).then();

      this._snackBar.open('You have successfully added the property!');
    }
  }

  getInputFiles(fileInput: HTMLInputElement) {
    const files = fileInput.files;
    const result = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);

        if (file)
          result.push(file);
      }
    }

    return result;
  }

  getError(control: FormControl, label: string) {
    return this._validation.getError(control, label);
  }
}
