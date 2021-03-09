import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ApolloQueryResult} from "@apollo/client/core";
import {Reservation} from "../../../../../../server/src/db/graphql";
import {ReservationService} from "../../../data-services/reservation/reservation.service";

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.scss']
})
export class ViewReservationsComponent implements OnInit {
  reservations$: Observable<ApolloQueryResult<{ reservations: Reservation[] }>>;
  subscription = new Subscription();

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.subscription.add(this.reservationService.fetchReservations().subscribe());
    this.reservations$ = this.reservationService.getAllReservations();
  }



}
