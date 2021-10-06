import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookmarkIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { getDateFormat } from '../../utils'

export default function ArticleCard({
  className,
  data = {},
  handleClickBookmark,
  handleClickLike
}) {
  const likes = data?.likes_aggregate?.aggregate.count
  const isLiked = data?.likes.length > 0
  const isBookmarked = data?.bookmarks.length > 0
  const date = getDateFormat(data?.publishDate)

  return (
    <div className={className}>
      <div className="border-b border-gray-300 pb-6">
        <NavLink to={`/post/${data.articleId}`}>
          <p className="text-sm font-bold">Hernowo ari</p>
          <p className="mt-2 text-sm text-gray-500">
            {`${date} • ${data?.readingTime} • ${data?.articleTags?.[0]?.tagName}`}
          </p>

          <h1 className="mt-4 text-xl font-bold">{data?.title}</h1>

          {data?.thumbnail && (
            <img
              className="my-6 block object-cover max-w-full min-h-image-query max-h-80 "
              src={data?.thumbnail}
              alt="thumbnail"
            />
          )}

          {/* TODO: kalo jumlah huruf terlalu banyak -> kasih "..." */}
          <h3>{data?.subtitle}</h3>
          <h3 className="mt-2 text-sm text-gray-500">Read more...</h3>
        </NavLink>

        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-1">
            <ThumbUpIcon
              onClick={handleClickLike}
              fill={isLiked ? 'black' : 'white'}
              className="hover:cursor-pointer"
              width="1.2rem"
            />
            <span>{likes}</span>
          </div>
          <BookmarkIcon
            onClick={handleClickBookmark}
            fill={isBookmarked ? 'black' : 'white'}
            className="hover:cursor-pointer"
            width="1.2rem"
          />
        </div>
      </div>
    </div>
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
