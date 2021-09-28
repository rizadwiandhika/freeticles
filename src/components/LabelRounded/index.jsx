import React from 'react'

const colorMap = {
  blue: 'text-blue-600',
  gray: 'text-gray-600'
}

const bgColorMap = {
  
}

const boderColorMap = {

}

export default function LabelRounded(props) {
  const px = props.px ? `px-${props.px}` : 'px-4'
  const py = props.py ? `py-${props.py}` : 'py-1'

  const color = props.blue ? 'text-white' : 'text-blue-600'
  const bgColor = props.blue ? 'bg-blue-600' : 'bg-white'

  return (
    <div
      className={`hover:cursor-pointer min-w-min flex justify-center box-border items-center rounded-3xl border border-blue-600 ${px} ${py}  ${color} ${bgColor} `}
    >
      {props.text}
    </div>
  )
}
