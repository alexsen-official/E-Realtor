import { Injectable }     from '@angular/core';
import { catchError, of } from 'rxjs';

import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { IProperty }       from '../interfaces';
import { PropertyService } from './property.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<IProperty | null> {
  constructor(private readonly _router  : Router,
              private readonly _property: PropertyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._property
               .get(route.params['id'])
               .pipe(catchError(
                 error => {
                   this._router.navigate(['/']).then();
                   console.error(error);

                   return of(null);
                 }
               ));
  }
}
