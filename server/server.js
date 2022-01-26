const express = require("express");

// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

const db = require("./config/connection");
const PORT = process.env.PORT || 3001;

// require logic for integrating with Express
const app = express();
const httpServer = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function startApolloServer(typeDefs, resolvers) {
  // Same ApolloServer initialization as before, plus the drain plugin
  // creates a new Apollo server and passes in our schema data
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // more required logic for integrating with Express
  await apolloServer.start();
  // integrate our Apollo server with the Express application as middleware
  apolloServer.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    });
  });
}

startApolloServer(typeDefs, resolvers);
