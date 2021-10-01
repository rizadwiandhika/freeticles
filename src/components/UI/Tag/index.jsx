import React from 'react'

export default function Tag(props) {
  const px = props.px ? `px-${props.px}` : ''
  const py = props.py ? `py-${props.py}` : ''

  return (
    <div
      className={`min-w-min p-1 flex items-center rounded box-border text-gray-700 bg-gray-theme ${px} ${py}`}
    >
      {props.text}
      {props.children}
    </div>
  )
}
