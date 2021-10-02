import React from 'react'
import ArticleCard from '../../components/Article/ArticleCard'

export default function ReadingList(props) {
  return (
    <>
      <div className="my-8">
        <ArticleCard isReadingList />
      </div>
      <div className="my-8">
        <ArticleCard isReadingList />
      </div>
      <div className="my-8">
        <ArticleCard isReadingList />
      </div>
      <div className="my-8">
        <ArticleCard isReadingList />
      </div>
    </>
  )
}
