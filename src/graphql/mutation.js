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

export { INSERT_ONE_USER }
