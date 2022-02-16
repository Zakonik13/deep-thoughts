import React from "react";
// Special type of React component that provides data to all of the other components
import { ApolloProvider } from "@apollo/react-hooks";
// Gets the data when we are ready to use it
import ApolloClient from "apollo-boost";
// Renamed BrowserRouter as Router to make it easier to work with
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components and Pages
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const client = new ApolloClient({
  // Retrieve token from localStorage before each request is made to GraphQL
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  // Establish a new connection to the GraphQL server using Apollo
  uri: "/graphql",
});

// Because we're passing the client variable in as the value for the client prop in the provider,
// everything between the JSX tags will have access to the server's API data throught the client
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/thought/:id" element={<SingleThought />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
