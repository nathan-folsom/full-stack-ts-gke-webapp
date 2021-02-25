import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {CREATE_USER, LOGIN, LOGOUT} from "../home/mutations";
import {GET_USER} from "../home/queries";
import {User} from "../model/user";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo) {
  }

  getUser = () => this.apollo.watchQuery<{user: User}>({
    query: GET_USER
  })


  fetchUser = () => this.apollo.query<{user: User}>({
    query: GET_USER,
    fetchPolicy: 'network-only'
  })

  createUser = (username: string, password: string) =>
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        user: {username, password}
      }
    }).pipe(
      switchMap(() => this.fetchUser())
    ).subscribe();

  logIn = (username: string, password: string) =>
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        username,
        password
      },
      fetchPolicy: 'no-cache'
    }).pipe(
      switchMap(() => this.fetchUser())
    ).subscribe();

  logOut = () => this.apollo.mutate({
    mutation: LOGOUT,
    fetchPolicy: 'no-cache'
  }).pipe(
    switchMap(() => this.fetchUser())
  ).subscribe();
}
