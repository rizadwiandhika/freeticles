import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { DotsVerticalIcon, BookmarkIcon } from '@heroicons/react/outline'

import MenuDropdown from '../UI/MenuDropdown'

const defaultArticleMeta = {
  title: '',
  subtitle: '',
  username: '',
  publishDate: '',
  readingTime: ''
}

export default function Article({
  articleMeta = defaultArticleMeta,
  article,
  isPreview = false,
  isBookmarked = false
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{articleMeta.title}</h1>
      <h3 className="mt-4 text-xl font-bold text-gray-400">
        {articleMeta.subtitle}
      </h3>

      <div className="mt-8 flex justify-between">
        <div>
          <p>{articleMeta.username || '<Author name>'}</p>
          <p>{`${articleMeta.publishDate} • ${articleMeta.readingTime}`}</p>
        </div>
        <div className={`flex gap-1 ${isPreview ? 'invisible' : ''}`}>
          <BookmarkIcon
            className="hover:cursor-pointer"
            width="1.2rem"
            fill={isBookmarked ? 'black' : 'white'}
          />

          <MenuDropdown>
            <DotsVerticalIcon className="hover:cursor-pointer" width="1.2rem" />

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
        children={article}
        className="mt-16 prose prose-blue max-w-none article-content"
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  )
}
