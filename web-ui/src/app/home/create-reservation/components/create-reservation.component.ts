import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {ApolloQueryResult} from "@apollo/client/core";
import {Reservation} from "../../../../../../server/src/db/graphql";
import {ReservationService} from "../service/reservation.service";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit {
  reservations$: Observable<ApolloQueryResult<{ reservations: Reservation[] }>>;
  createReservationInput = {
    date: new FormControl(new Date()),
    time: {hour: '6', minute: '00', period: 'am'},
    location: new FormControl(''),
    message: new FormControl('')};
  minDate = new Date();
  hoursOfTheDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11' , '12'];
  minuteIncrements = ['15', '30', '45', '00'];

  constructor(private reservationService: ReservationService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reservations$ = this.reservationService.getAllReservations();
  }

  dateChange = (e) => {
  }

  create = () => {
    this.reservationService.create({
      location: this.createReservationInput.location.value,
      time: this.getDateFromInputs(this.createReservationInput.date.value, this.createReservationInput.time),
      message: this.createReservationInput.message.value
    })
    this.openSnackBar();
  }

  getDateFromInputs = (date: Date, time) => {
    const {hour, minute, period} = time;
    date.setHours(period === 'am' ? parseInt(hour) : parseInt(hour) + 12, parseInt(minute));
    return date;
  }

  openSnackBar = () => {
    this.snackBar.open('Reservation created', 'close', {duration: 3000})
  }

}
