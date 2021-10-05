import React from 'react'
import { getDateFormat } from '../../utils'

export default function SelfArticleCard({ className, data }) {
  return (
    <div className={className}>
      <div className="max-w-screen-sm">
        <h1 className="text-xl font-bold">{data?.title}</h1>
        <h3 className="mt-2 text-gray-500">{data?.subtitle}</h3>
        <p className="mt-4 text-sm text-gray-500">{`${getDateFormat(
          data?.publishDate
        )} • ${data?.readingTime}`}</p>
      </div>
    </div>
  )
}
