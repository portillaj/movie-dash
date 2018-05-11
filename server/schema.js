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
  details: {
    type: MovieDetailType,
    resolve(parent,args){
       return axios.get(`${BASE_URL}/3/movie/${parent.id}?api_key=${API_KEY}`)
      .then(response => response.data);
    }
  },
  theTrailer: {
    type: TrailerType,
    resolve(parent, args) {
      return axios.get(`${BASE_URL}/3/movie/${parent.id}/videos?api_key=${API_KEY}`)
      .then(response => response.data.results[0]);
    }
  }
  })
});

const TrailerType = new GraphQLObjectType({
  name: 'Trailer',
  fields: () => ({
    id: { type: GraphQLID },
    key: { type: GraphQLString },
    name: { type: GraphQLString },
    site: { type: GraphQLString },
    size: { type: GraphQLString }
  })
});

const getData = new GraphQLObjectType({
  name: 'list',
  fields: () => ({
    id: { type: GraphQLID },
    budget: { type: GraphQLString },
    overview: { type: GraphQLString },
    title: { type: GraphQLString }
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
    type: MovieType,
    resolve(parent, args) {
      return axios.get(`${BASE_URL}/3/search/movie${parent.id}?api_key=${API_KEY}&query=${parent.title}`)
      .then(response => response.data);
    }
  },
  theTrailer: {
    type: TrailerType,
    resolve(parent, args) {
      return axios.get(`${BASE_URL}/3/movie/${parent.id}/videos?api_key=${API_KEY}`)
      .then(response => response.data.results[0]);
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
    },
    trailer: {
      type: TrailerType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return axios.get(`${BASE_URL}/3/movie/${args.id}/videos?api_key=${API_KEY}`)
      .then(response => response.data.results[0]);
      }
    },
    getData: {
      type: getData,
      resolve(parent, args) {
         return axios.get(`${BASE_URL}/3/movie/latest?api_key=${API_KEY}`)
      .then(response => response.data);
      }
      }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});