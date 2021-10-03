import React from 'react'
import {
  DotsVerticalIcon,
  BookmarkIcon,
  ThumbUpIcon
} from '@heroicons/react/outline'

export default function ArticleCard(props) {
  return (
    <div className="border-b border-gray-300 pb-6">
      <p className="text-sm font-bold">Hernowo ari</p>
      <p className="mt-2 text-sm text-gray-500">
        Sep 6 • 8 min read • programing
      </p>

      <h1 className="mt-4 text-xl font-bold">
        21 Best Practices for a Clean React Project{' '}
      </h1>

      <img
        className="my-6 block object-cover max-w-full min-h-image-query max-h-80 "
        // src="https://miro.medium.com/fit/c/200/134/1*VRAXxJJjOcC0Bk_bEM3eEw.png"
        // src="https://cdn-images-1.medium.com/max/176/1*7vHAt-cf_fNTwf6blO2W8g.png"
        src="https://miro.medium.com/max/1400/1*7MzyPH03m_cuJG0qiscDQA.png"
        alt="article thumbnail"
      />

      {/* TODO: kalo jumlah huruf terlalu banyak -> kasih "..." */}
      <h3>A curated list of the best React libraries</h3>
      <h3 className="mt-2 text-sm text-gray-500">Read more...</h3>

      <div className="mt-4 flex justify-between">
        <div className="flex items-center gap-1">
          <ThumbUpIcon className="hover:cursor-pointer" width={20} />
          <span>23</span>
        </div>
        <DotsVerticalIcon className="hover:cursor-pointer" width={20} />
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
