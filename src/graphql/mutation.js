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

/* 

*/
const DELETE_LIKE_BY_ID = gql`
  mutation DeleteLikeById($likeId: Int!) {
    delete_likes_by_pk(likeId: $likeId) {
      username
      articleId
      likeId
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

export {
  INSERT_ONE_USER,
  INSERT_ONE_ARTICLE,
  INSERT_TAGS,
  INSERT_ONE_LIKE,
  INSERT_ONE_COMMENT,
  DELETE_LIKE_BY_ID
}
