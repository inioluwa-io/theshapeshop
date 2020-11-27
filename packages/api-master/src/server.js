import { ApolloServer } from 'apollo-server-micro';
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda';
import { typeDefs, resolvers } from './utils/graphql';
import { isAuthenticated } from './utils/auth';

const cors = require('micro-cors')();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => ({
    user: await isAuthenticated(req),
  }),
});

const serverLambda = new ApolloServerLambda({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => ({
    user: await isAuthenticated(req),
  }),
});

const lambdaOptionsHandler = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  return serverLambda.createHandler({ path: '/api' })(req, res);
};

const optionsHandler = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  return server.createHandler({ path: '/api' })(req, res);
};

const lambdaCors = cors(lambdaOptionsHandler);
const localCors = cors(optionsHandler);

module.exports = { lambdaCors, localCors };
