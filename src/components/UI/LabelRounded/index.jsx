import React from 'react'

const colorMap = {
  blue: {
    text: 'text-white',
    bg: 'bg-blue-theme',
    border: 'border-blue-theme'
  },
  'blue-invert': {
    text: 'text-blue-theme',
    bg: 'bg-white',
    border: 'border-blue-theme'
  },
  gray: {
    text: 'text-black',
    bg: 'bg-gray-theme',
    border: 'border-gray-theme'
  },
  black: { text: 'text-white', bg: 'bg-black', border: 'border-black' }
}

export default function LabelRounded(props) {
  const px = props.px ? `px-${props.px}` : 'px-4'
  const py = props.py ? `py-${props.py}` : 'py-1'

  const color = colorMap[props.theme]?.text
  const bgColor = colorMap[props.theme]?.bg
  const borderColor = colorMap[props.theme]?.border

  return (
    <div
      onClick={props.clicked}
      className={`hover:cursor-pointer min-w-min flex justify-center box-border items-center rounded-3xl border ${px} ${py} ${color} ${bgColor} ${borderColor}`}
    >
      {props.text}
    </div>
  )
}
