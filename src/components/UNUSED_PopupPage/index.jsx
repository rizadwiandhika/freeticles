import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function PopupPage(props) {
  return (
    <div
      // + overflow-y-auto
      // bg-white supaya content dibelakangnya ga keliatan
      className="fixed overflow-y-auto inset-0 z-50 bg-white"
    >
      <div
        // - h-screen overflow-y-auto
        className="w-11/12 max-w-screen-md mx-auto my-8"
      >
        <div className="flex justify-end">
          <button onClick={props.togglePreview} className="p-4">
            X
          </button>
        </div>
        <ReactMarkdown
          children={props.article}
          // https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width
          // Matiin max-width dari prose (max-width prose itu 65ch)
          className="prose prose-blue max-w-none article-content"
          remarkPlugins={[gfm]}
          rehypePlugins={[rehypeRaw]}
        />
      </div>
    </div>
  )
}
