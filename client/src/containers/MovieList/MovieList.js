
import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Container, Row, Col } from 'reactstrap';
import MovieListItems from '../../components/MovieListItems';
import './MovieList.css';

const getLatestQuery = gql`
  {
    latest {
      title
      id
      overview
      popularity
      poster_path
      vote_average
      release_date
      vote_average
    }
  }
`;

const BASE_IMG = 'http://image.tmdb.org/t/p/w185';

class MovieList extends Component {
  getLatestMovies = () => {
    const { data } = this.props;
    console.log(data);
    if (data.loading) {
      return <div>Loading Movie....</div>;
    }
    return data.latest.map(item => (
      <div className="movieList">
          <li className="movieListItem" key={ item.id }>
            <img src={ `${BASE_IMG}${item.poster_path}` } alt={ `movie poster for ${item.title}` } />
           <h3 className="movie-title">{item.title}</h3>
           <h3 className="text-secondary">{item.vote_average}</h3>
        </li>
        </div>
    ));
  }

  render() {
    return (
         <MovieListItems movieData={ this.getLatestMovies() } />
    );
  }
}

export default graphql(getLatestQuery)(MovieList);
