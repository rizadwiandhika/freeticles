import React from 'react'
import { BookmarkIcon, ThumbUpIcon } from '@heroicons/react/outline'

export default function ArticleCard(props) {
  return (
    <div className="border-b border-gray-300 pb-6">
      <img
        className="my-6 block object-cover max-w-full min-h-image-query max-h-80 "
        // src="https://miro.medium.com/fit/c/200/134/1*VRAXxJJjOcC0Bk_bEM3eEw.png"
        // src="https://cdn-images-1.medium.com/max/176/1*7vHAt-cf_fNTwf6blO2W8g.png"
        src="https://miro.medium.com/max/1400/1*7MzyPH03m_cuJG0qiscDQA.png"
        alt="article thumbnail"
      />
      <h1 className="mt-4 text-xl font-bold">
        21 Best Practices for a Clean React Project{' '}
      </h1>

      <p className="mt-4 text-sm font-bold">Hernowo ari</p>

      <div className="mt-1 flex justify-between">
        <p className="text-sm text-gray-500">Sep 6 • 8 min read</p>

        <div className="flex items-center">
          <div className="mr-4 flex items-center gap-1">
            <ThumbUpIcon className="hover:cursor-pointer" width={20} />
            <span>23</span>
          </div>
          <BookmarkIcon className="hover:cursor-pointer" width={20} />
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
