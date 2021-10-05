import React from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/client'
import { GET_USER_BOOKMARKS } from '../../graphql/query'
import ArticleCard from '../../components/Article/ArticleCard'
import loadingFetch from '../../assets/loading-fetch.svg'

export default function ReadingList(props) {
  const user = useSelector((state) => state.user)
  const { loading, data, error } = useQuery(GET_USER_BOOKMARKS, {
    variables: { username: user.username }
  })

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

  return (
    <>
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <ArticleCard
            key={bookmark.bookmarkId}
            className="my-8"
            isBookmarked
            data={bookmark.article}
          />
        ))
      ) : (
        <h1 className="mt-4 text-2xl text-gray-500 text-center">
          Bookmark is empty
        </h1>
      )}
      {/* <ArticleCard className="my-8" isReadingList />
      <ArticleCard className="my-8" isReadingList />
      <ArticleCard className="my-8" isReadingList />
      <ArticleCard className="my-8" isReadingList /> */}
    </>
  )
}
