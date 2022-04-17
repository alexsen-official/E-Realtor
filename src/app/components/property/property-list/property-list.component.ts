import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _housingService: HousingService) { }

  async ngOnInit(): Promise<void> {
    if (this._activatedRoute.snapshot.url.toString()) {
      this.forSell = false;
    }

    this.properties = await this._housingService.getProperties(this.forSell);
  }
}
