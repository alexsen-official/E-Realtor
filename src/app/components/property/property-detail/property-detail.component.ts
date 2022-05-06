import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProperty } from '../../../interfaces';
import { PropertyService } from '../../../services';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property!: IProperty;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _propertyService: PropertyService) { }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(
      data => this.property = data['property']
    )
  }
}
