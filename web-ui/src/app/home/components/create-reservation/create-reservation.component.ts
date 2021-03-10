import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ReservationService} from "../../../data-services/reservation/reservation.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit, OnDestroy {
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
  }

  ngOnDestroy() {
  }

  create = () => {
    this.createFromInputs();
    this.openSnackBar();
  }

  createFromInputs = () => this.reservationService.create({
    location: this.createReservationInput.location.value,
    time: this.getDateFromInputs(this.createReservationInput.date.value, this.createReservationInput.time),
    message: this.createReservationInput.message.value
  });

  getDateFromInputs = (date: Date, time) => {
    const {hour, minute, period} = time;
    let hourNumber = parseInt(hour);
    if (period == 'am') {
      hourNumber = hourNumber === 12 ? 0 : hourNumber;
    } else {
      hourNumber = hourNumber === 12 ? 12 : hourNumber + 12;
    }
    date.setHours(hourNumber, parseInt(minute));
    return date;
  }

  openSnackBar = () => {
    this.snackBar.open('Reservation created', 'close', {duration: 3000})
  }

}
