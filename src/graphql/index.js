import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const HASURA_GRAPHQL_ENDPOINT = 'https://graphql-todolist.hasura.app/v1/graphql'
const PASSWORD =
  'CB705B2zBWRuIhDA9uIXY9pEusH9wZTwhEdwgPb4uGGQZuUCjyceqmUrJKmU8Zfl'

const client = new ApolloClient({
  uri: HASURA_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': PASSWORD
  }
})

export default client

export const GET_ARTICLES = gql`
  query MyQuery {
    articles {
      data
      id
    }
  }
`

export const INSERT_ONE_ARTICLE = gql`
  mutation MyMutation($data: String!) {
    insert_articles_one(object: { data: $data }) {
      data
      id
    }
  }
`

export const GET_ANGGOTA = gql`
  query GET_ANGGOTA {
    anggota {
      nama
      umur
      id
      jenis_kelamin
      keterangans {
        id
        id_anggota
        nilai
        pelajaran
        status
      }
    }
  }
`

// Tanda seru pada "$id: Int!" artinya saat passing variable "id", nilainya GA BOLEH NULL
export const GET_ANGGOTA_BY_ID = gql`
  query MyQuery($id: Int!) {
    anggota_by_pk(id: $id) {
      id
      jenis_kelamin
      nama
      umur
      keterangans {
        id
        id_anggota
        nilai
        pelajaran
        status
      }
    }
  }
`

export const INSERT_ONE_ANGGOTA = gql`
  mutation ADD_ANGGOTA($data: anggota_insert_input!) {
    insert_anggota_one(object: $data) {
      jenis_kelamin
      nama
      umur
      keterangans {
        id
        id_anggota
        nilai
        pelajaran
        status
      }
      id
    }
  }
`

export const DELETE_ANGGOTA_BY_ID = gql`
  mutation DELETE_ANGGOTA_BY_ID($id: Int!) {
    delete_anggota_by_pk(id: $id) {
      id
      nama
      jenis_kelamin
      umur
      keterangans {
        id
        nilai
        pelajaran
        status
      }
    }
  }
`

export const UPDATE_ANGGOTA = gql`
  mutation MyMutation2(
    $id: Int!
    $nama: String!
    $umur: Int!
    $jenis_kelamin: String!
  ) {
    update_anggota_by_pk(
      pk_columns: { id: $id }
      _set: { nama: $nama, umur: $umur, jenis_kelamin: $jenis_kelamin }
    ) {
      id
      nama
      umur
      jenis_kelamin
      keterangans {
        id
        id_anggota
        nilai
        pelajaran
        status
      }
    }
  }
`
