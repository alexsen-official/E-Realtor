import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProperty } from '../../../interfaces';
import { PropertyService } from '../../../services';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  forSell: boolean = true;
  properties: IProperty[] = [];

  isAsc: boolean = true;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _propertyService: PropertyService) { }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.url.toString()) {
      this.forSell = false;
    }

    this.fetchProperties();
  }

  fetchProperties(): void {
    this._propertyService
      .getProperties(this.forSell)
      .subscribe(
        properties => this.properties = properties,
        error => console.error(error)
      );
  }

  trackByPropertyId(index: number, property: IProperty): number {
    return property.id;
  }

  reverseSortOrder(): void {
    this.isAsc = !this.isAsc;
  }
}
