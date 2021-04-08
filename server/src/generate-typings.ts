import {GraphQLDefinitionsFactory} from "@nestjs/graphql";

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: ['./**/*.graphql'],
    path: '../../graphql/graphql.ts',
});