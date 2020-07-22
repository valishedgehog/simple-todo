import ApolloClient from "apollo-boost";
import { InMemoryCache } from "@apollo/react-hooks";
import config from "./config";

const apolloClient = new ApolloClient({
  uri: config.HASURA_API_URIHASURA_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: config.HASURA_ADMIN_SECRET,
  },
  cache: InMemoryCache,
});

export default apolloClient;
