import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IProperty } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private readonly _http: HttpClient) { }

  getProperty(id: number): Observable<IProperty> {
    return this._http.get<IProperty>(`http://localhost:3000/properties/${id}`);
  }

  getProperties(forSell: boolean): Observable<IProperty[]> {
    return this._http
      .get<IProperty[]>('http://localhost:3000/properties')
      .pipe(map(
        properties => properties.filter(
          property => property.forSell === forSell
        )
      ));
  }

  addProperty(property: IProperty): Observable<IProperty> {
    return this._http.post<IProperty>('http://localhost:3000/properties', property);
  }
}
