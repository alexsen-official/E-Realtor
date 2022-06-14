import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  AddPropertyComponent,
  PropertyDetailComponent,
  PropertyListComponent,
  UserLoginComponent,
  UserRegisterComponent
} from '../components';

import { ResolverService } from '../services';

const routes = [
  {
    path: 'property-detail/:id',
    component: PropertyDetailComponent,
    resolve: { property: ResolverService }
  },

  { path: '',               component: PropertyListComponent },
  { path: 'rent-property',  component: PropertyListComponent },
  { path: 'add-property',   component: AddPropertyComponent  },
  { path: 'users/login',    component: UserLoginComponent    },
  { path: 'users/register', component: UserRegisterComponent },
  { path: '**',             component: PropertyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
