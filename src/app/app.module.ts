import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddPropertyComponent } from './components/property/add-property/add-property.component';
import { PropertyCardComponent } from './components/property/property-card/property-card.component';
import { PropertyDetailComponent } from './components/property/property-detail/property-detail.component';
import { PropertyListComponent } from './components/property/property-list/property-list.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';

import { AuthService } from './services/auth/auth.service';
import { HousingService } from './services/housing/housing.service';
import { SnackBarService } from './services/snack-bar/snack-bar.service';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyCardComponent,
    PropertyDetailComponent,
    PropertyListComponent,
    UserLoginComponent,
    UserRegisterComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexModule,

    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonToggleModule,

    AppRoutingModule
  ],
  providers: [
    AuthService,
    HousingService,
    SnackBarService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
