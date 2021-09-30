import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const defaultArticleMeta = { title: '', subtitle: '', author: '' }

export default function Article({ articleMeta = defaultArticleMeta, article }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{articleMeta.title}</h1>
      <h3 className="mt-4 text-xl font-bold text-gray-400">
        {articleMeta.subtitle}
      </h3>
      <p className="mt-8">{articleMeta.author || '<Author name>'}</p>
      <p>{'20 Sep • 3 mins read'}</p>
      <ReactMarkdown
        children={article}
        // https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width
        // Matiin max-width dari prose (max-width prose itu 65ch)
        className="mt-16 prose prose-blue max-w-none article-content"
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  )
}
