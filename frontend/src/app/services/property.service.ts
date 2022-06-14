import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { map }         from 'rxjs';
import { environment } from '../../environments/environment';
import { IProperty }   from '../interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  readonly apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient,
              private readonly _user: UserService) { }

  get(id: string) {
    return this._http.get<IProperty>(`${ this.apiUrl }/properties/${ id }`);
  }

  getAll(forRent: boolean) {
    return this._http
               .get<IProperty[]>(`${ this.apiUrl }/properties`)
               .pipe(map(properties => properties.filter(
                 property => property.forRent === forRent
               )));
  }

  create(property: IProperty) {
    property.owner = this._user.token;
    return this._http.post<IProperty>(`${ this.apiUrl }/properties`, property);
  }

  update(property: IProperty) {
    return this._http.put<IProperty>(`${ this.apiUrl }/properties`, property);
  }

  delete(id: string) {
    return this._http.delete<IProperty>(`${ this.apiUrl }/properties/${ id }`);
  }
}
