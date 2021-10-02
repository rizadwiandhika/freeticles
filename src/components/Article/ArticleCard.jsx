import React from 'react'
import { DotsVerticalIcon, BookmarkIcon } from '@heroicons/react/outline'

export default function ArticleCard({ isReadingList = false }) {
  return (
    <div className="flex h-40">
      <div className="p-2 w-full flex flex-col justify-between">
        <div>
          <p className="text-sm">Hernowo ari</p>
          <h1 className="mt-2 text-xl font-bold">
            21 Best Practices for a Clean React Project{' '}
          </h1>
          <h3 className="text-gray-500">
            A curated list of the best React libraries
          </h3>
        </div>

        <div className="flex justify-between">
          <p className="text-sm text-gray-500">
            Sep 6 • 8 min read • programing
          </p>
          <div className="mr-4 flex gap-1">
            <BookmarkIcon
              className="hover:cursor-pointer"
              width={20}
              fill={isReadingList ? 'black' : 'white'}
            />
            <DotsVerticalIcon className="hover:cursor-pointer" width={20} />
          </div>
        </div>
      </div>

      <div className="flex items-center w-72">
        <img
          className="block w-full h-36 object-cover"
          src="https://miro.medium.com/fit/c/200/134/1*VRAXxJJjOcC0Bk_bEM3eEw.png"
          alt="article thumbnail"
        />
      </div>
    </div>
  )
}
