import {gql} from "@apollo/client/core";

export const CREATE_RESERVATION = gql`
  mutation($reservation: CreateReservationInput!) {
    createReservation(reservation: $reservation) {
      id
      location
      time
      message
      userId
    }
  }
`

export const GET_ALL_RESERVATIONS = gql`
    query {
      reservations {
        id
        userId
        location
        message
        time
      }
    }
`
