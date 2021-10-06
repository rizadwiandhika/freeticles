import { gql } from '@apollo/client'

/* 
{
  "data": {
    "name": "Hammim Eka Musthafa", 
    "username": "hammim123",
    "password": "$2a$12$Flr2dvayCAguQhO4MvBBpOQZDsRWP.Qq2.IiF3KCXqqDozqNo.yjG"
  }
}
*/
const INSERT_ONE_USER = gql`
  mutation InsertOneUser($user: users_insert_input!) {
    insert_users_one(object: $user) {
      name
      password
      username
    }
  }
`
/* 
Input:

"articleData": {
  "username": "hammim",
  "title": "asd",
  "subtitle": "asddasd",
  "content": "asdlkjasdlkqje",
  "publishDate": "2021-09-12",
  ...
}

Return value insert one article:
{
  "data": {
    "insert_articles_one": {
      "articleId": 9,
      "publishDate": "2021-09-12",
      "username": "hammim",
      "title": "asd"
    }
  }
}
*/
const INSERT_ONE_ARTICLE = gql`
  mutation InsertOneArticle($articleData: articles_insert_input!) {
    insert_articles_one(object: $articleData) {
      username
      title
      subtitle
      thumbnail
      readingTime
      publishDate
      articleId
    }
  }
`

/* 
Input: 
"tags" : [
  {"tagName": "Programming", "articleId": 9},
  {"tagName": "Lifestyle", "articleId": 9},
  {"tagName": "Learn", "articleId": 9}
]

Return value
{
  "data": {
    "insert_articleTags": {
      "affected_rows": 3,
      "returning": [
        {
          "id": 6,
          "tagName": "Programming",
          "articleId": 9
        },
        {
          "id": 7,
          "tagName": "Lifestyle",
          "articleId": 9
        },
        {
          "id": 8,
          "tagName": "Learn",
          "articleId": 9
        }
      ]
    }
  }
}
*/

const INSERT_TAGS = gql`
  mutation InsertTags($tags: [articleTags_insert_input!]!) {
    insert_articleTags(objects: $tags) {
      affected_rows
      returning {
        id
        tagName
        articleId
      }
    }
  }
`

/* 

*/
const INSERT_ONE_LIKE = gql`
  mutation InsertOneLike($data: likes_insert_input!) {
    insert_likes_one(object: $data) {
      articleId
      likeId
      username
    }
  }
`

const UPDATE_ARTICLE_BY_ID = gql`
  mutation UpdateArticle(
    $articleId: Int!
    $content: String!
    $publishDate: date!
    $readingTime: String!
    $subtitle: String!
    $thumbnail: String!
    $title: String!
  ) {
    update_articles_by_pk(
      pk_columns: { articleId: $articleId }
      _set: {
        content: $content
        publishDate: $publishDate
        readingTime: $readingTime
        subtitle: $subtitle
        thumbnail: $thumbnail
        title: $title
      }
    ) {
      articleId
    }
  }
`

/* 

*/
const DELETE_USER_LIKE = gql`
  mutation DeleteUserLike($username: String!, $articleId: Int!) {
    delete_likes(
      where: {
        _and: [
          { username: { _eq: $username } }
          { articleId: { _eq: $articleId } }
        ]
      }
    ) {
      returning {
        articleId
        likeId
        username
      }
    }
  }
`

/*
Input:
"comment": {
  "articleId": 14,
  "username": "riza.dwii",
  "date": "2021-10-05",
  "commentar": "Wihh keren banget articlenya"
}

Return:
{
  "data": {
    "insert_comments_one": {
      "username": "riza.dwii",
      "commentar": "Wihh keren banget articlenya",
      "commentId": 1,
      "articleId": 14
    }
  }
}
 */
const INSERT_ONE_COMMENT = gql`
  mutation InsertOneComment($comment: comments_insert_input!) {
    insert_comments_one(object: $comment) {
      username
      commentar
      commentId
      articleId
    }
  }
`

const INSERT_ONE_BOOKMARK = gql`
  mutation InsertOneBookmark($data: bookmarks_insert_input!) {
    insert_bookmarks_one(object: $data) {
      username
      bookmarkId
      articleId
    }
  }
`

const DELETE_USER_BOOKMARK = gql`
  mutation DeleteUserBookmark($username: String!, $articleId: Int!) {
    delete_bookmarks(
      where: {
        _and: [
          { username: { _eq: $username } }
          { articleId: { _eq: $articleId } }
        ]
      }
    ) {
      returning {
        username
        articleId
      }
    }
  }
`

const DELETE_ARTICLE_BY_ID = gql`
  mutation DeleteArticleById($articleId: Int!) {
    delete_articles_by_pk(articleId: $articleId) {
      username
      title
      articleId
    }
  }
`

const DELETE_AND_INSERT_TAGS_BY_ARTICLE_ID = gql`
  mutation DeleteAndInsertTagsByArticleId(
    $articleId: Int!
    $newTags: [articleTags_insert_input!]!
  ) {
    delete_articleTags(where: { articleId: { _eq: $articleId } }) {
      affected_rows
      returning {
        tagName
      }
    }
    insert_articleTags(objects: $newTags) {
      returning {
        tagName
      }
    }
  }
`

export {
  INSERT_ONE_USER,
  INSERT_ONE_ARTICLE,
  INSERT_TAGS,
  INSERT_ONE_LIKE,
  INSERT_ONE_COMMENT,
  INSERT_ONE_BOOKMARK,
  DELETE_USER_LIKE,
  DELETE_USER_BOOKMARK,
  DELETE_ARTICLE_BY_ID,
  DELETE_AND_INSERT_TAGS_BY_ARTICLE_ID,
  UPDATE_ARTICLE_BY_ID
}
