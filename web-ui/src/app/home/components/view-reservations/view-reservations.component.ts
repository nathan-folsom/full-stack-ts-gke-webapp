import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
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
  subscription = new Subscription();

  constructor(private reservationService: ReservationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription.add(this.reservationService.fetchReservations().subscribe());
    this.reservations$ = this.reservationService.getAllReservations();
    this.user$ = this.authService.getUser().valueChanges;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteReservation = (reservationId: string) => {
    this.subscription.add(this.reservationService.deleteReservation(reservationId).subscribe());
  }

}
