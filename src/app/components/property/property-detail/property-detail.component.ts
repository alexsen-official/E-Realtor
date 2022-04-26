import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProperty } from '../../../interfaces';
import { PropertyService } from '../../../services';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  id!: number;
  property!: IProperty;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _propertyService: PropertyService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      params => this.id = +params['id']
    );

    this.fetchProperty();
  }

  fetchProperty(): void {
    this._propertyService
      .getProperty(this.id)
      .subscribe(
        property => this.property = property || this.property,
        error => console.error(error)
      );
  }
}
