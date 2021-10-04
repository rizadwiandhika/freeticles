import React from 'react'
import MenuDropdown from '../UI/MenuDropdown'
import { DotsVerticalIcon, BookmarkIcon } from '@heroicons/react/outline'

export default function ArticleCard({ className, data, isBookmarked = false }) {
  console.log(data?.articleTags)
  const date = getDateFormat(data?.publishDate)
  const tag = data?.articleTags[0].tagName

  return (
    <div className={className}>
      <div className="flex h-40">
        <div className="p-2 w-full flex flex-col justify-between">
          <div>
            <p className="text-sm">{data?.username || 'Hernowo ari'}</p>
            <h1 className="mt-2 text-xl font-bold">
              {data?.title || '21 Best Practices for a Clean React Project'}
            </h1>
            <h3 className="text-gray-500">{data?.subtitle}</h3>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500">
              {`${date} • ${data?.readingTime} • ${tag}`}
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
            src={data?.thumbnail}
            alt="article thumbnail"
          />
        </div>
      </div>
    </div>
  )
}

function getDateFormat(date) {
  if (!date) return ''

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const current = new Date()
  let [year, month, day] = date.split('-')
  year = +year
  month = +month
  day = +day

  let formatDate = `${day} ${monthNames[month]}`

  if (year < current.getFullYear()) formatDate = `${formatDate}, ${year}`
  return formatDate
}
