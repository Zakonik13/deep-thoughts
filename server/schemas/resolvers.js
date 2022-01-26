const { User, Thought } = require("../models");
// object called resolvers
const resolvers = {
  // nested Query object that holds series of methods
  Query: {
    // Method matching the name of query or mutation being executed
    // Here, we pass in the parent as more of a placeholder parameter
    // It won't be used, but we need something in that first parameter's
    // spot so we can access the username argument from the second parameter
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get all users
    users: async () => {
      return (
        User.find()
          // omits __v (from mongoose) and password
          .select("-__v -password")
          .populate("friends")
          .populate("thoughts")
      );
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
};

module.exports = resolvers;
