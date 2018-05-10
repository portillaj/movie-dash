const graphql = require('graphql');
const axios = require('axios');

const API_KEY = '2d733da824cd8c252eab2c2990379324';

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
     release_date: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: { title: {type: GraphQLString}},
      resolve(parent, args) {
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${args.title}`)
        .then(response => response.data.results[0]);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});