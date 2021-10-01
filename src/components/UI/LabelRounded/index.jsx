import React from 'react'

const colorMap = {
  blue: 'text-blue-theme',
  gray: 'text-gray-600'
}

const bgColorMap = {}

const boderColorMap = {}

export default function LabelRounded(props) {
  const px = props.px ? `px-${props.px}` : 'px-4'
  const py = props.py ? `py-${props.py}` : 'py-1'

  const color = props.blue ? 'text-white' : 'text-blue-theme'
  const bgColor = props.blue ? 'bg-blue-theme' : 'bg-white'

  return (
    <div
      onClick={props.clicked}
      className={`hover:cursor-pointer min-w-min flex justify-center box-border items-center rounded-3xl border border-blue-theme ${px} ${py}  ${color} ${bgColor} `}
    >
      {props.text}
    </div>
  )
}
