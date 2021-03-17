import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/components/home/home.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {AuthService} from "./data-services/auth/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TopNavComponent } from './top-nav/top-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import { CreateReservationComponent } from './home/components/create-reservation/create-reservation.component';
import {MatButtonModule} from "@angular/material/button";
import {ReservationService} from "./data-services/reservation/reservation.service";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";
import { ReservationsComponent } from './home/components/reservations/reservations.component';
import {
  GroupReservationsPipe, SortReservationsPipe,
  ViewReservationsComponent
} from './home/components/view-reservations/view-reservations.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavComponent,
    CreateReservationComponent,
    ReservationsComponent,
    ViewReservationsComponent,
    GroupReservationsPipe,
    SortReservationsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule
  ],
  providers: [
    AuthService,
    ReservationService,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
