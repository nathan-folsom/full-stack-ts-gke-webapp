import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, gql} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, InMemoryCacheConfig, makeVar} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';

const options: InMemoryCacheConfig = {
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       user: {
  //         read() {
  //           return makeVar({})
  //         }
  //       }
  //     }
  //   }
  // }
}

const clientDefs = gql`
  extend type Query {
    getUser: User!
  }
`

const uri = 'http://localhost:4200/api'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
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
