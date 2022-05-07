import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import {
  AppComponent,
  NavBarComponent,
  AddPropertyComponent,
  PropertyCardComponent,
  PropertyDetailComponent,
  PropertyListComponent,
  SideBarComponent,
  UserLoginComponent,
  UserRegisterComponent
} from './components';

import { AppRoutingModule } from './modules';

import {
  FilterPipe,
  SortPipe
} from './pipes';

import {
  PropertyService,
  PropertyDetailResolverService,
  SnackBarService,
  ThemeService,
  UserService,
  ValidationErrorService
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyCardComponent,
    PropertyDetailComponent,
    PropertyListComponent,
    SideBarComponent,
    UserLoginComponent,
    UserRegisterComponent,

    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ExtendedModule,
    FlexModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [
    PropertyService,
    PropertyDetailResolverService,
    SnackBarService,
    ThemeService,
    UserService,
    ValidationErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
