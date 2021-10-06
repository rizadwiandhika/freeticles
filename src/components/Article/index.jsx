import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { DotsVerticalIcon, BookmarkIcon } from '@heroicons/react/outline'
import MenuDropdown from '../UI/MenuDropdown'
import { getDateFormat } from '../../utils'

const defaultArticleMeta = {
  title: '',
  subtitle: '',
  username: '',
  publishDate: '',
  readingTime: ''
}

export default function Article({
  data = {},
  isPreview = false,
  isBookmarked = false,
  handleClickBookmark = () => {}
}) {
  return (
    <div>
      <h1 className="text-4xl font-bold">{data?.title}</h1>
      <h3 className="mt-2 text-xl text-gray-500">{data?.subtitle}</h3>

      <div className="mt-8 flex justify-between items-end text-gray-500 text-sm">
        <div>
          <p className="my-2">{data?.username || '<Author name>'}</p>
          <p>{`${getDateFormat(data?.publishDate)} • ${data?.readingTime}`}</p>
        </div>
        <div className={`flex gap-1 ${isPreview ? 'invisible' : ''}`}>
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
      <ReactMarkdown
        // https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width
        // Matiin max-width dari prose (max-width prose itu 65ch)
        children={data?.content}
        className="mt-16 prose prose-blue max-w-none article-content"
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  )
}
