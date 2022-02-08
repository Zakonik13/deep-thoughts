import React from "react";
// Special type of React component that provides data to all of the other components
import { ApolloProvider } from "@apollo/react-hooks";
// Gets the data when we are ready to use it
import ApolloClient from "apollo-boost";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// Establish a new connection to the GraphQL server using Apollo
const client = new ApolloClient({
  uri: "/graphql",
});

// Because we're passing the client variable in as the value for the client prop in the provider,
// everything between the JSX tags will have access to the server's API data throught the client
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
