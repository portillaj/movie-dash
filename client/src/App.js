import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import MovieList from './containers/MovieList/MovieList';

// apollo client setup
const client = new ApolloClient({
  // eslint-disable-next-line
  uri: '/graphql',
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      // eslint-disable-next-line
      <ApolloProvider client={client}> 
        <div>
          <MovieList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
