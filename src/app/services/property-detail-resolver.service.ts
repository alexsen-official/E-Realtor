import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { IProperty } from '../interfaces';
import { PropertyService } from './property.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<IProperty | null> {
  constructor(private readonly _router: Router,
              private readonly _propertyService: PropertyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProperty | null> {
    return this._propertyService
      .getProperty(route.params['id'])
      .pipe(catchError(
        error => {
          this._router.navigate(['/']).then();
          console.error(error);

          return of(null);
        }
      ));
  }
}
