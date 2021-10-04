import React from 'react'
import MenuDropdown from '../UI/MenuDropdown'
import { DotsVerticalIcon, BookmarkIcon } from '@heroicons/react/outline'

export default function ArticleCard({ className, isBookmarked = false }) {
  return (
    <div className={className}>
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
                width="1.2rem"
                fill={isBookmarked ? 'black' : 'white'}
              />

              <MenuDropdown>
                <DotsVerticalIcon
                  className="hover:cursor-pointer"
                  width="1.2rem"
                />

                <>
                  <li className="my-4 text-gray-500 hover:cursor-pointer hover:text-black ">
                    Report article
                  </li>
                </>
              </MenuDropdown>
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
    </div>
  )
}
