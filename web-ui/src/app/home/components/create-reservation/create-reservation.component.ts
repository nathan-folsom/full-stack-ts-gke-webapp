import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../../../data-services/reservation/reservation.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit, OnDestroy {
  defaultReservationTime = {hour: '6', minute: '00', period: 'am'};
  reservationInput = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    location: new FormControl('', [Validators.required]),
    message: new FormControl('')
  })
  createReservationTime = {...this.defaultReservationTime};
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

  createFromInputs = () => {
    this.reservationService.create({
      location: this.reservationInput.get('location').value,
      time: this.getDateFromInputs(),
      message: this.reservationInput.get('message').value,
    });
    this.resetForm();
  };

  resetForm = () => {
    this.reservationInput.reset({
      date: new Date(),
      location: '',
      message: ''
    })
    this.createReservationTime = {...this.defaultReservationTime};
  }

  getDateFromInputs = () => {
    const date = new Date(this.reservationInput.get('date').value);
    const {hour, minute, period} = this.createReservationTime;
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
