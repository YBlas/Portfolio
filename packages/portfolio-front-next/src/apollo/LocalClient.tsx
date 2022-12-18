import { ApolloClient, InMemoryCache } from "@apollo/client";


const localClient = new ApolloClient({
    uri: "http://api:1963/graphql",
    cache: new InMemoryCache()
});

export default localClient;