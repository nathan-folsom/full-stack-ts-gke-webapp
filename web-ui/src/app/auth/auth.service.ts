import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {CREATE_USER} from "../home/mutations";
import {GET_USER, LOGIN, SESSION_IS_ACTIVE} from "../home/queries";
import {User} from "../model/user";

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo) {
  }

  getUser = () =>
    this.apollo.watchQuery<{getUser: User}>({
      query: GET_USER,
      fetchPolicy: 'cache-only'
    }).valueChanges

  createUser = (username: string, password: string) =>
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        username,
        password
      }
    })

  logIn = (username: string, password: string) => {
    console.log(username, password)
    return this.apollo.query({
      query: LOGIN,
      variables: {
        username,
        password
      },
      fetchPolicy: 'network-only'
    })
  }

  userIsLoggedIn = () => this.apollo.query<{sessionIsActive: boolean}>({
    query: SESSION_IS_ACTIVE
  })
}
