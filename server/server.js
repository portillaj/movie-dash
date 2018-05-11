const express = require("express");
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

app.use(cors());
const PORT = process.env.PORT || 5000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log('server listening on port ' + PORT);
})