import { ApolloClient, InMemoryCache } from '@apollo/client';
export const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPH_QL_URL,//"http://localhost:3080/graphql",
    cache: new InMemoryCache(),
});
