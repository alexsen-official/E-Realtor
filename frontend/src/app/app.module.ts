import { HttpClientModule }           from '@angular/common/http';
import { NgModule }                   from '@angular/core';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule }        from '@angular/forms';

import { MatButtonModule }                      from '@angular/material/button';
import { MatButtonToggleModule }                from '@angular/material/button-toggle';
import { MatCardModule }                        from '@angular/material/card';
import { MatChipsModule }                       from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule }                  from '@angular/material/datepicker';
import { MatDividerModule }                     from '@angular/material/divider';
import { MatFormFieldModule }                   from '@angular/material/form-field';
import { MatIconModule }                        from '@angular/material/icon';
import { MatInputModule }                       from '@angular/material/input';
import { MatListModule }                        from '@angular/material/list';
import { MatMenuModule }                        from '@angular/material/menu';
import { MatRadioModule }                       from '@angular/material/radio';
import { MatSelectModule }                      from '@angular/material/select';
import { MatSidenavModule }                     from '@angular/material/sidenav';
import { MatSnackBarModule }                    from '@angular/material/snack-bar';
import { MatStepperModule }                     from '@angular/material/stepper';
import { MatToolbarModule }                     from '@angular/material/toolbar';
import { MatTooltipModule }                     from '@angular/material/tooltip';

import { BrowserModule }                        from '@angular/platform-browser';
import { BrowserAnimationsModule }              from '@angular/platform-browser/animations';

import {
  AddPropertyComponent,
  AppComponent,
  NavBarComponent,
  PropertyCardComponent,
  PropertyDetailComponent,
  PropertyListComponent,
  SideBarComponent,
  UserLoginComponent,
  UserRegisterComponent
} from './components';

import { AppRoutingModule }     from './modules';
import { FilterPipe, SortPipe } from './pipes';

import {
  PropertyService,
  ResolverService,
  SnackBarService,
  ThemeService,
  UserService,
  ValidationService
} from './services';

@NgModule({
  declarations: [
    AddPropertyComponent,
    AppComponent,
    NavBarComponent,
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
    HttpClientModule,
    ExtendedModule,
    FlexModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    PropertyService,
    ResolverService,
    SnackBarService,
    ThemeService,
    UserService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
