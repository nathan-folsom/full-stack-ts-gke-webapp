import {gql} from "@apollo/client/core";

export const GET_USER = gql`
  query {
    user {
      userId
      username
      status
    }
  }
`
