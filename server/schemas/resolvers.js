const { User, Book } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return Profile.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
          },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect E-mail or password');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect E-mail or password');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, { bookId, title, authors, description, image, link }, context) => {
            if (!context.user) {
              throw new AuthenticationError('Not logged in');
            }
      
            const updatedUser = await User.findByIdAndUpdate(
              context.user._id,
              {
                $addToSet: {
                  savedBooks: { bookId, title, authors, description, image, link },
                },
              },
              { new: true, runValidators: true }
            );
      
            return updatedUser;
          },
          deleteBook: async (parent, { bookId }, context) => {
            if (!context.user) {
              throw new AuthenticationError('Not logged in');
            }
      
            const updatedUser = await User.findByIdAndUpdate(
              context.user._id,
              { $pull: { savedBooks: { bookId } } },
              { new: true }
            );
      
            if (!updatedUser) {
              throw new Error("Couldn't find user with this id!");
            }
      
            return updatedUser;
          },
    },
};

module.exports = resolvers