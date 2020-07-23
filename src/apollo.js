import ApolloClient from "apollo-boost";
import config from "./config";

const apolloClient = new ApolloClient({
  uri: config.HASURA_API_URI,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": config.HASURA_ADMIN_SECRET,
  },
});

export default apolloClient;
