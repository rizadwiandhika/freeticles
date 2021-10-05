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

const GET_USER_BOOKMARKS = gql`
  query GetUserBookmarks($username: String = "") {
    users_by_pk(username: $username) {
      bookmarks {
        bookmarkId
        article {
          articleId
          publishDate
          readingTime
          subtitle
          thumbnail
          title
          username
          articleTags {
            tagName
          }
        }
        username
      }
    }
  }
`

const GET_USER_ARTICLES = gql`
  query GetUserArticles($username: String = "") {
    users_by_pk(username: $username) {
      articles {
        articleId
        articleTags {
          articleId
          id
          tagName
        }
        username
        title
        subtitle
        readingTime
        publishDate
      }
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
  query GetArticleById($articleId: Int!, $username: String = "") {
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
        date
      }
      likes_aggregate {
        aggregate {
          count(columns: likeId)
        }
      }
      likes(where: { username: { _eq: $username } }) {
        likeId
        username
      }
      bookmarks(where: { username: { _eq: $username } }) {
        bookmarkId
        username
      }
    }
  }
`

export {
  GET_USERS,
  GET_USER_BY_USERNAME,
  GET_USER_BOOKMARKS,
  GET_USER_ARTICLES,
  GET_ARTICLES,
  GET_ARTICLE_BY_ID
}
