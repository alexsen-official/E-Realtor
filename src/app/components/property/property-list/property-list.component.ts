import {
  Component,
  OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { IProperty } from '../../../interfaces/property.interface';
import { HousingService } from '../../../services/housing/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  forSell: boolean = true;
  properties: IProperty[] = [];

  constructor(private _activatedRoute: ActivatedRoute,
              private _housingService: HousingService) { }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.url.toString()) {
      this.forSell = false;
    }

    this._housingService
      .getProperties()
      .subscribe(
      data => {
        for (let property of data) {
          if (property.forSell === this.forSell) {
            this.properties.push(property);
          }
        }
      },
      error => console.log(error)
      );
  }
}
