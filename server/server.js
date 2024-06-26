const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes'); 
//dont think I will need these

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')

const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require ('./utils/auth');
const { type } = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //introspection: true
});

const startApolloServer = async () => {
  await server.start()

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};


startApolloServer();



//app.use(routes); 
//Dont think I will need this


