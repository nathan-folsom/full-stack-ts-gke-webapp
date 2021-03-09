import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {CREATE_RESERVATION, GET_ALL_RESERVATIONS} from "./gql";
import {map} from "rxjs/operators";
import {CreateReservationInput, Reservation} from "../../../../../server/src/db/graphql";
import {appState} from "../../graphql.module";

@Injectable()
export class ReservationService {
  constructor(private apollo: Apollo) {
  }

  create = (input: CreateReservationInput) => this.apollo.mutate<{ createReservation: Reservation }>({
    mutation: CREATE_RESERVATION,
    variables: {
      reservation: input
    }
  }).pipe(
    map( (r) => {
      const previousReservations = appState.reservations();
      appState.reservations([...previousReservations, r.data.createReservation]);
    })
  ).subscribe();

  getAllReservations = () => this.apollo.watchQuery<{ reservations: Reservation[] }>({
    query: GET_ALL_RESERVATIONS,
    fetchPolicy: "cache-only"
  }).valueChanges
}
