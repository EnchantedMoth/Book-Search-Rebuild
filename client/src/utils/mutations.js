import { gql } from '@apollo/client'

export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
      password
    }
  }
}`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      password
      savedBooks {
        bookId
      }
    }
  }
}`;

export const SAVE_BOOK = gql`
mutation SaveBook($authors: [String], $description: String, $title: String, $bookId: ID, $image: String, $link: String) {
  saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
    _id
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}`

export const DELETE_BOOK = gql`
mutation DeleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    _id
    email
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}`