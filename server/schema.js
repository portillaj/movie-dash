const graphql = require('graphql');
const axios = require('axios');

const API_KEY = '2d733da824cd8c252eab2c2990379324';
const BASE_URL = 'https://api.themoviedb.org';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    popularity: { type: GraphQLString },
    backdrop_path: { type: GraphQLString },
    overview: { type: GraphQLString },
     release_date: { type: GraphQLString },
  theDetails: {
    type: new GraphQLList(MovieDetailType),
    resolve(parent,args){
       return axios.get(`${BASE_URL}/3/movie/${parent.id}?api_key=${API_KEY}`)
      .then(response => response.data);
    }
  }
  })
});

const MovieDetailType = new GraphQLObjectType({
  name: 'MovieDetail',
  fields: () => ({
    id: { type: GraphQLID },
    budget: { type: GraphQLString },
    runtime: { type: GraphQLString },
    revenue: { type: GraphQLString },
    poster_path: { type: GraphQLString },
  theMovie: {
    type: new GraphQLList(MovieType),
    resolve(parent, args) {
      console.log('parent is ' + parent.title);
      return axios.get(`${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${parent.title}`)
      .then(response => response.data.results);
    }
  }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { title: {type: GraphQLString}},
      resolve(parent, args) {
        return axios.get(`${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${args.title}`)
        .then(response => response.data.results[0]);
      }
    },
    movieDetail: {
      type: MovieDetailType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return axios.get(`${BASE_URL}/3/movie/${args.id}?api_key=${API_KEY}`)
      .then(response => response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});