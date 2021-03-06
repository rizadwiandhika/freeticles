import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client'

import { GET_USER_ARTICLES } from '../../graphql/query'
import { DELETE_ARTICLE_BY_ID } from '../../graphql/mutation'
import SelfArticleCard from '../../components/Article/SelfArticleCard'
import LabelRounded from '../../components/UI/LabelRounded'

import loadingFetch from '../../assets/loading-fetch.svg'

export default function YourArticle(props) {
  const user = useSelector((state) => state.user)
  const [deletingArticle, setDeletingArticle] = useState('')
  const [deleteArticleById] = useMutation(DELETE_ARTICLE_BY_ID)
  const { loading, data, error, refetch } = useQuery(GET_USER_ARTICLES, {
    fetchPolicy: 'network-only',
    variables: { username: user.username }
  })

  async function handleDeleteArticle(articleId) {
    try {
      setDeletingArticle(articleId)
      await deleteArticleById({ variables: { articleId } })
      await refetch()
    } catch (error) {
      console.error(error.message)
      alert('failed deleting article')
    } finally {
      setDeletingArticle('')
    }
  }

  function handleEditArticle(articleId) {
    props.history.push(`/create-article?edit=${articleId}`)
  }

  function handleLabelClick() {
    props.history.push('/create-article')
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

  const articles = data.users_by_pk.articles

  return (
    <div>
      <div className="flex justify-end">
        <LabelRounded
          onClick={handleLabelClick}
          theme="blue-invert"
          text="Write article"
        />
      </div>
      {articles.length > 0 ? (
        articles.map((article) => (
          <SelfArticleCard
            key={article.articleId}
            data={article}
            isDeleting={deletingArticle === article.articleId}
            handleEditArticle={() => handleEditArticle(article.articleId)}
            handleDeleteArticle={
              deleteArticleById === article.articleId
                ? null
                : () => handleDeleteArticle(article.articleId)
            }
            className="my-8 pb-4 border-b border-gray-300"
          />
        ))
      ) : (
        <h1 className="mt-8 text-xl text-gray-500 text-center">
          You don't have any articles yet. Start writing your article now
        </h1>
      )}
    </div>
  )
}
