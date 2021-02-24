import {gql} from "@apollo/client/core";

export const GET_USER = gql`
  query {
    getUser {
      userId
      username
      status
    }
  }
`
export const LOGIN = gql`
  query($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      username
      status
      created
    }
  }
`

export const SESSION_IS_ACTIVE = gql`
    query {
      sessionIsActive
    }
`
