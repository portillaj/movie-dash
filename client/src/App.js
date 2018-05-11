import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import MovieList from './components/MovieList';

// apollo client setup
const client = new ApolloClient({
  // eslint-disable-next-line
  uri: 'http://localhost:5000/graphql',
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
