import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, gql} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, InMemoryCacheConfig, makeVar} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {Reservation} from "../../../server/src/db/graphql";

const options: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        reservations: {
          read() {
            return appState.reservations();
          }
        }
      }
    }
  }
}

export const appState = {
  reservations: makeVar<Reservation[]>([])
}

const clientDefs = gql`
  extend type Query {
    getUser: User!
    reservations: [Reservation]!
  }
`

const uri = 'http://localhost:4200/api'; // <-- add the URL of the GraphQL server here
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
