import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map }        from 'rxjs';
import { IProperty }  from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private readonly _http: HttpClient) { }

  get(id: number) {
    return this._http.get<IProperty>(`http://localhost:3000/properties/${ id }`);
  }

  getAll(forRent: boolean) {
    return this._http
               .get<IProperty[]>('http://localhost:3000/properties')
               .pipe(map(properties => properties.filter(
                 property => property.rent.forRent === forRent
               )));
  }

  add(property: IProperty) {
    return this._http.post<IProperty>('http://localhost:3000/properties', property);
  }
}
