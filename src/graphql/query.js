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

const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($articleId: Int!) {
    articles_by_pk(articleId: $articleId) {
      content
      publishDate
      readingTime
      subtitle
      thumbnail
      title
      username
      articleTags {
        tagName
      }
      articleId
      comments {
        commentar
        username
        commentId
      }
      likes_aggregate {
        aggregate {
          count(columns: likeId)
        }
      }
    }
  }
`

export { GET_USERS, GET_USER_BY_USERNAME, GET_ARTICLES, GET_ARTICLE_BY_ID }
