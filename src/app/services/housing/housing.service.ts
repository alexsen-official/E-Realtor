import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { IProperty } from '../../interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  constructor(private readonly _http: HttpClient) { }

  async getProperties(forSell: boolean): Promise<IProperty[]> {
    let properties: IProperty[] = await lastValueFrom(
      this._http.get<IProperty[]>('data/properties.json')
    );

    properties.push(...JSON.parse(localStorage.getItem('properties') || '[]'));
    return properties.filter(property => property.forSell === forSell);
  }

  addProperty(property: IProperty) : void {
    let properties = JSON.parse(localStorage.getItem('properties') || '[]');

    property.id = properties.length + 1;

    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
  }
}
