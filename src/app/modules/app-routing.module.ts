import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  PropertyListComponent,
  PropertyDetailComponent,
  AddPropertyComponent,
  UserLoginComponent,
  UserRegisterComponent
} from '../components';

import { PropertyDetailResolverService } from '../services';

const routes: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'rent-property', component: PropertyListComponent },
  { path: 'property-detail/:id', component: PropertyDetailComponent, resolve: { property: PropertyDetailResolverService } },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: '**', component: PropertyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
