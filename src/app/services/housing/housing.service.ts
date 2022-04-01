import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProperty } from '../../interfaces/property.interface';
import { IPropertyType } from '../../interfaces/property-type.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  constructor(private _http: HttpClient) { }

  getProperties(): Observable<IProperty[]> {
    return this._http.get<IProperty[]>('data/properties.json');
  }

  getPropertyTypes(): Observable<IPropertyType[]> {
    return this._http.get<IPropertyType[]>('data/property-types.json');
  }
}
