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
  forRent = true;
  isAsc   = true;

  properties: IProperty[] = [];

  constructor(private readonly _route   : ActivatedRoute,
              private readonly _property: PropertyService) { }

  ngOnInit() {
    if (this._route.snapshot.url.toString())
      this.forRent = false;

    this.fetchProperties();
  }

  fetchProperties() {
    this._property
        .getAll(this.forRent)
        .subscribe(
          properties => this.properties = properties,
          error      => console.error(error)
        );
  }

  trackById   = (index: number) => this.properties[index].id;
  reverseSort = ()              => this.isAsc = !this.isAsc;
}
