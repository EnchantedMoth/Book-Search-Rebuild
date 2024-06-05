import { gql } from '@apollo/client'

export const GET_ME = gql`
query Query($userId: ID!) {
    me(userId: $userId) {
      _id
      email
      password
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
      username
    }
  }`;