// src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import awsExports from './aws-exports';

const apiEndpoint = awsExports.aws_cloud_logic_custom[0].endpoint;

const client = new ApolloClient({
  link: createHttpLink({
    uri: apiEndpoint, // DO NOT add /graphql here
  }),
  cache: new InMemoryCache(),
});

console.log("API Endpoint:", apiEndpoint);

export default client;