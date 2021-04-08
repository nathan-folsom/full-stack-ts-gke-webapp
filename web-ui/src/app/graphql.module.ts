import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, gql} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, InMemoryCacheConfig, makeVar} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {Friend, Reservation} from "../../../graphql/graphql";
import {environment} from "../environments/environment";

const options: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        reservations: {
          read() {
            return appState.reservations();
          }
        },
        friends: {
          read() {
            return appState.friends();
          }
        }
      }
    }
  }
}

export const appState = {
  reservations: makeVar<Reservation[]>([]),
  friends: makeVar<Friend[]>([])
}

const clientDefs = gql`
  extend type Query {
    getUser: User!
    reservations: [Reservation]!
    friends: [Friend]!
  }
`

const uri = environment.uri;
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri,
      withCredentials: true
    }),
    cache: new InMemoryCache(options),
    typeDefs: clientDefs
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
