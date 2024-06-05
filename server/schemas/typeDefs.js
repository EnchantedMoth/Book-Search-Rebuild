const typeDefs = `
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        bookId: ID!
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
      }

    type Query {
        me(userId: ID!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(authors: [String], description: String, title: String, bookId: ID, image: String, link: String): User
        deleteBook(bookId: ID!): User
    }
`

module.exports = typeDefs