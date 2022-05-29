import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { IProperty }         from '../../../interfaces';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property!: IProperty;

  constructor(private readonly _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.data.subscribe(
      data => this.property = data['property']
    );
  }
}
