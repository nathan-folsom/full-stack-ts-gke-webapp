import {gql} from "@apollo/client/core";

export const CREATE_USER = gql`
    mutation ($user: CreateUserInput!) {
      createUser(user: $user)
    }
`

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const LOGOUT = gql`
  mutation {
    logout
  }
`
