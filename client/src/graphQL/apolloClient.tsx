import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: "http://localhost:3080/graphql",//process.env.REACT_APP_GRAPHQL_URL,
    cache: new InMemoryCache(),
});
