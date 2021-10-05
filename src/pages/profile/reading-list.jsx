import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_BOOKMARKS } from '../../graphql/query'
import {
  INSERT_ONE_BOOKMARK,
  DELETE_USER_BOOKMARK
} from '../../graphql/mutation'
import ArticleCard from '../../components/Article/ArticleCard'
import loadingFetch from '../../assets/loading-fetch.svg'

export default function ReadingList(props) {
  const user = useSelector((state) => state.user)
  const [deletedArticle, setDeletedArticle] = useState([])
  const { loading, data, error } = useQuery(GET_USER_BOOKMARKS, {
    fetchPolicy: 'network-only',
    variables: { username: user.username }
  })

  const [insertOneBookmark] = useMutation(INSERT_ONE_BOOKMARK)
  const [deleteUserBookmark] = useMutation(DELETE_USER_BOOKMARK)

  async function toggleBookmark(articleId) {
    const data = { username: user.username, articleId }

    try {
      if (deletedArticle.includes(articleId)) {
        setDeletedArticle((prev) => prev.filter((id) => id !== articleId))
        await insertOneBookmark({ variables: { data } })
      } else {
        setDeletedArticle((prev) => [...prev, articleId])
        await deleteUserBookmark({ variables: { ...data } })
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  if (loading) {
    return <img className="block mx-auto" src={loadingFetch} alt="loading..." />
  }

  if (error) {
    return (
      <h1 className="mt-4 text-xl text-center">
        Something went wrong.. Try again
      </h1>
    )
  }

  const bookmarks = data.users_by_pk.bookmarks

  console.log(bookmarks)
  return (
    <>
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <ArticleCard
            handleClickBookmark={() =>
              toggleBookmark(bookmark.article.articleId)
            }
            key={bookmark.bookmarkId}
            className="my-8"
            isReadingList={!deletedArticle.includes(bookmark.article.articleId)}
            data={bookmark.article}
          />
        ))
      ) : (
        <h1 className="mt-4 text-2xl text-gray-500 text-center">
          Bookmark is empty
        </h1>
      )}
    </>
  )
}
