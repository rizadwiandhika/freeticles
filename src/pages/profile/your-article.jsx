import React from 'react'
import SelfArticleCard from '../../components/Article/SelfArticleCard'
import LabelRounded from '../../components/UI/LabelRounded'

export default function YourArticle(props) {
  return (
    <div>
      <div className="flex justify-end">
        <div className="w-32">
          <LabelRounded theme="blue-invert" text="Write article" />
        </div>
      </div>
      <SelfArticleCard className="my-8 pb-4 border-b border-gray-300" />
      <SelfArticleCard className="my-8 pb-4 border-b border-gray-300" />
      <SelfArticleCard className="my-8 pb-4 border-b border-gray-300" />
      <SelfArticleCard className="my-8 pb-4 border-b border-gray-300" />
    </div>
  )
}
