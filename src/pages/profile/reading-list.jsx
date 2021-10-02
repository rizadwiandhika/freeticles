import React from 'react'
import ArticleCard from '../../components/Article/ArticleCard'

export default function ReadingList(props) {
  return (
    <>
      <ArticleCard className="my-8" isReadingList />
      <ArticleCard className="my-8" isReadingList />
      <ArticleCard className="my-8" isReadingList />
      <ArticleCard className="my-8" isReadingList />
    </>
  )
}
