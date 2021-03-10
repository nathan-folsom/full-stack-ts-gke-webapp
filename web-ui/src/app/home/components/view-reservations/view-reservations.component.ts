import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ApolloQueryResult} from "@apollo/client/core";
import {Reservation} from "../../../../../../server/src/db/graphql";
import {ReservationService} from "../../../data-services/reservation/reservation.service";
import {AuthService} from "../../../data-services/auth/auth.service";
import {User} from "../../../model/user";

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.scss']
})
export class ViewReservationsComponent implements OnInit, OnDestroy {
  reservations$: Observable<ApolloQueryResult<{ reservations: Reservation[] }>>;
  user$: Observable<ApolloQueryResult<{ user: User }>>;

  constructor(private reservationService: ReservationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.reservationService.fetchReservations();
    this.reservations$ = this.reservationService.getAllReservations();
    this.user$ = this.authService.getUser().valueChanges;
  }

  ngOnDestroy() {
  }

  deleteReservation = (reservationId: string) => {
    this.reservationService.deleteReservation(reservationId);
  }

}
