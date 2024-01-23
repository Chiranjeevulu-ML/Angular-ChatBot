import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripControlComponent } from './trip-control/trip-control.component';
import { API } from 'src/service/api.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateFormatConfig } from './common/DateFormatConfig';
import { GoogleMapsModule } from '@angular/google-maps';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { NewLayoutComponent } from './new-layout/new-layout.component';
import {MatRadioModule} from '@angular/material/radio';
import { AppServiceUrls } from 'src/service/appserviceurls';
import { AuthLoginComponent } from './auth-login/auth-login.component';
@NgModule({
  declarations: [
    AppComponent,
    TripControlComponent,
    DialogContentExampleDialogComponent,
    AuthButtonComponent,
    NewLayoutComponent,
    AuthLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleMapsModule,
    MatRadioModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      //domain: 'dev-w1bmqazbzn600xvo.us.auth0.com',
      // clientId: 'Kd16lPoUWpRQ1YeGBsW94tgyISN6hubI',
      domain: "dev-lzqzhbfg.us.auth0.com",
      clientId: 'LXKvIXLWGxlemITE431esrHADakJB3PH',
      authorizationParams: {
        redirect_uri: window.location.origin + "/callback",
        //redirect_uri: "http://localhost:4200/callback"
      },
    }),
  ],
  providers: [API, AppServiceUrls, DateFormatConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
