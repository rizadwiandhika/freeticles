import { gql } from '@apollo/client'

const GET_USERS = gql`
  query Users {
    users {
      name
      password
      username
    }
  }
`

const GET_USER_BY_USERNAME = gql`
  query UserByUsername($username: String!) {
    users_by_pk(username: $username) {
      name
      username
      password
    }
  }
`

const GET_ARTICLES = gql`
  query GetArticles {
    articles(limit: 20) {
      articleId
      title
      thumbnail
      subtitle
      username
      readingTime
      publishDate
      articleTags {
        tagName
      }
    }
  }
`

export { GET_USERS, GET_USER_BY_USERNAME, GET_ARTICLES }
