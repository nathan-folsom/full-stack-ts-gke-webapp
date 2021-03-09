import {gql} from "@apollo/client/core";

export const CREATE_RESERVATION = gql`
  mutation($reservation: CreateReservationInput!) {
    createReservation(reservation: $reservation) {
      id
      username
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
      username
      userId
      location
      message
      time
    }
  }
`

export const FETCH_RESERVATIONS = gql`
  query {
    allReservations {
      id
      username
      userId
      location
      time
      message
    }
  }
`

export const DELETE_RESERVATION = gql`
  mutation ($reservationId: String!) {
    deleteReservation(reservationId: $reservationId)
  }
`
