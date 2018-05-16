import React from 'react';
import { Button, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import './MovieListItem.css';

const MovieListItems = props => (
  <Container className="main-background">
   <ul className="list">
          { props.movieData }
      </ul>
  </Container>

);

export default MovieListItems;
