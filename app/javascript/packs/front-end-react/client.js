import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': csrfToken
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
