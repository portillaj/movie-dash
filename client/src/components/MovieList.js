import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getMovieQuery = gql`
  {
    getData {
      title
      budget
      id
      overview
    }
  }
`;

class MovieList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Testing</h1>
      </div>
    );
  }
}

export default graphql(getMovieQuery)(MovieList);
