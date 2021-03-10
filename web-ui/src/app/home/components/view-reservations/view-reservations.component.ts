import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
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

@Pipe({name: 'groupReservations'})
export class GroupReservationsPipe implements PipeTransform {
  transform(value: Reservation[]): any {
    const groupedByDay = this.groupReservationsByDay(value);
    return this.sortGroupedReservationsByDay(groupedByDay);
  }

  groupReservationsByDay = (input: Reservation[]) => {
    const mappedByDay = new Map<number, Reservation[]>();
    input.forEach(r => {
      const timeAtStartOfDay = this.timeAtStartOfDay(r.time)
      if (mappedByDay.has(timeAtStartOfDay)) {
        mappedByDay.get(timeAtStartOfDay).push(r);
      } else {
        mappedByDay.set(timeAtStartOfDay, [r]);
      }
    })
    return mappedByDay;
  }

  sortGroupedReservationsByDay = (input: Map<number, Reservation[]>): Reservation[][] => {
    const sortedKeysByDate = [...input.keys()].sort((a, b) => a - b);
    return sortedKeysByDate.map(k => input.get(k));
  }

  timeAtStartOfDay = (date: string): number => {
    const toDate = new Date(date);
    return new Date(toDate.getUTCFullYear(), toDate.getMonth(), toDate.getDate()).getTime()
  }

}

@Pipe({name: 'sortReservations'})
export class SortReservationsPipe implements PipeTransform {
  transform(value: Reservation[]): any {
    return value.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
  }
}
