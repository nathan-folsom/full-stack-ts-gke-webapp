import {gql} from "@apollo/client/core";

export const CREATE_USER = gql`
    mutation ($user: CreateUserInput!) {
      createUser(user: $user) {
        userId
        username
        status
        created
      }
    }
`
