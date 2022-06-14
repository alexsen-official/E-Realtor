import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { IProperty }         from '../../../interfaces';
import { PropertyService }   from '../../../services';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  forRent = false;
  isAsc   = true;

  properties: IProperty[] = [];
  isLoaded = false;

  constructor(private readonly _route   : ActivatedRoute,
              private readonly _property: PropertyService) { }

  ngOnInit() {
    if (this._route.snapshot.url.toString())
      this.forRent = true;

    this.fetchProperties();
  }

  fetchProperties() {
    this._property
        .getAll(this.forRent)
        .subscribe(
          properties => {
            this.properties = properties;
            this.isLoaded = true;
          },
          error => {
            console.error(error);
            this.isLoaded = true;
          }
        );
  }

  trackById   = (index: number, item: IProperty) => item._id;
  reverseSort = () => this.isAsc = !this.isAsc;
}
