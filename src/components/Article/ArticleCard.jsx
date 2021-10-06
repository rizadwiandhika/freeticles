import React from 'react'
import { DotsVerticalIcon, BookmarkIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'
import MenuDropdown from '../UI/MenuDropdown'
import { getDateFormat } from '../../utils'

export default function ArticleCard({
  className,
  data,
  handleClickBookmark,
  isReadingList
}) {
  const date = getDateFormat(data?.publishDate)
  const tag = data?.articleTags[0].tagName
  const isBookmarked =
    isReadingList !== undefined ? isReadingList : data?.bookmarks?.length > 0

  return (
    <div className={className}>
      <div className="flex h-40">
        <div className="p-2 w-full flex flex-col justify-between">
          <div>
            <p className="text-sm">{data?.username || 'Hernowo ari'}</p>
            <NavLink to={`/post/${data.articleId}`}>
              <h1 className="mt-2 text-xl font-bold">
                {data?.title || '21 Best Practices for a Clean React Project'}
              </h1>
              <h3 className="text-gray-500">{data?.subtitle}</h3>
            </NavLink>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500">
              {`${date} • ${data?.readingTime} • ${tag}`}
            </p>
            <div className="mr-4 flex gap-1">
              <BookmarkIcon
                onClick={handleClickBookmark}
                className="hover:cursor-pointer"
                width={20}
                fill={isBookmarked ? 'black' : 'white'}
              />

              <MenuDropdown>
                <DotsVerticalIcon className="hover:cursor-pointer" width={20} />

                <>
                  <li className="my-4 text-gray-500 hover:cursor-pointer hover:text-black ">
                    Report article
                  </li>
                </>
              </MenuDropdown>
            </div>
          </div>
        </div>

        <NavLink
          to={`/post/${data.articleId}`}
          className="flex items-center w-72"
        >
          {data?.thumbnail && (
            <img
              className="block w-full h-36 object-cover"
              src={data?.thumbnail}
              alt=" "
            />
          )}
        </NavLink>
      </div>
    </div>
  )
}
