import {gql} from "@apollo/client/core";

export const FETCH_FRIENDS = gql`
  query {
    getFriends {
      userId
      username
      created
    }
  }
`

export const GET_FRIENDS = gql`
  query {
    friends {
      userId
      username
      created
    }
  }
`

export const SEND_FRIEND_REQUEST = gql`
  mutation ($username: String!) {
    sendFriendRequest(username: $username)
  }
`
