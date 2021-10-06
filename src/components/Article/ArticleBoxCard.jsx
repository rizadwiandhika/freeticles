import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookmarkIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { getDateFormat } from '../../utils'

export default function ArticleCard({ data }) {
  const isLiked = data?.likes?.length > 0
  const isBookmarked = data?.bookmarks?.length > 0
  const likes = data?.likes_aggregate?.aggregate?.count || 0
  const date = getDateFormat(data?.publishDate)

  const linkTarget = {
    pathname: `/post/${data.articleId}`,
    key: Math.random(),
    state: { applied: true }
  }

  return (
    <NavLink
      to={linkTarget}
      className="hover:cursor-pointer w-full md:w-1/3 block border-b border-gray-300 pb-6"
    >
      <img
        className="my-6 block object-cover max-w-full min-h-image-query max-h-80 "
        src={data?.thumbnail}
        alt=" "
      />
      <h1 className="mt-4 text-xl font-bold">{data?.title}</h1>

      <p className="mt-4 text-sm font-bold">{data?.username}</p>

      <div className="mt-1 flex justify-between">
        <p className="text-sm text-gray-500">{`${date} • ${data?.readingTime}`}</p>

        <div className="flex items-center">
          <div className="mr-4 flex items-center gap-1">
            <ThumbUpIcon fill={isLiked ? 'black' : ''} width={20} />
            <span>{likes}</span>
          </div>
          <BookmarkIcon fill={isBookmarked ? 'black' : ''} width={20} />
        </div>
      </div>
    </NavLink>
  )
}

async function getMeta(url, callback) {
  const img = new Image()
  img.src = url
  img.onload = function () {
    callback(this.width, this.height)
  }
}

// getMeta(
//   'https://miro.medium.com/fit/c/200/134/1*VRAXxJJjOcC0Bk_bEM3eEw.png',
//   (width, height) => console.log(width, height)
// )
