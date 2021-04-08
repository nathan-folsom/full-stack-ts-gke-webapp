import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {FETCH_FRIENDS, GET_FRIENDS, SEND_FRIEND_REQUEST} from "./gql";
import {Friend, FriendRequestResponse} from "../../../../../graphql/graphql";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs/operators";
import {appState} from "../../graphql.module";

@Injectable()
export class FriendService {
  constructor(private apollo: Apollo,
              private snackbar: MatSnackBar) {
  }

  getFriends = () => this.apollo.watchQuery<{friends: Friend[]}>({
    query: GET_FRIENDS,
    fetchPolicy: 'cache-only'
  }).valueChanges

  fetchFriends = () => this.apollo.query<{getFriends: Friend[]}>({
    query: FETCH_FRIENDS,
    fetchPolicy: 'network-only'
  }).pipe(
    map(r => appState.friends(r.data.getFriends))
  ).subscribe()

  sendRequest = (username: string) => this.apollo.mutate<{sendFriendRequest: FriendRequestResponse}>({
    mutation: SEND_FRIEND_REQUEST,
    variables: {
      username
    },
  }).subscribe(r => this.handleFriendRequestResponse(r.data.sendFriendRequest, username))

  private handleFriendRequestResponse = (response: FriendRequestResponse, username: string) => {
    switch (response) {
      case FriendRequestResponse.already_connected:
        return this.snackbar.open(`Already friends with ${username}!`);
      case FriendRequestResponse.connected:
        this.fetchFriends();
        return this.snackbar.open(`You are now friends with ${username}!`);
      case FriendRequestResponse.username_not_found:
        return this.snackbar.open(`Username not found: ${username}`);
      case FriendRequestResponse.invalid:
        return this.snackbar.open('Invalid username');
      default:
        return this.snackbar.open('Request sent!');
    }
  }
}
