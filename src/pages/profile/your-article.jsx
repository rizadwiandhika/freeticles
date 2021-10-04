import React from 'react'
import SelfArticleCard from '../../components/Article/SelfArticleCard'
import LabelRounded from '../../components/UI/LabelRounded'

export default function YourArticle(props) {
  function handleLabelClick() {
    props.history.push('/create-article')
  }

  return (
    <div>
      <div className="flex justify-end">
        <LabelRounded
          onClick={handleLabelClick}
          theme="blue-invert"
          text="Write article"
        />
      </div>
      <SelfArticleCard className="my-8 pb-4 border-b border-gray-300" />
      <SelfArticleCard className="my-8 pb-4 border-b border-gray-300" />
      <SelfArticleCard className="my-8 pb-4 border-b border-gray-300" />
      <SelfArticleCard className="my-8 pb-4 border-b border-gray-300" />
    </div>
  )
}
