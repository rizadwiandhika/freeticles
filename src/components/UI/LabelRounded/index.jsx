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

export default function LabelRounded({
  className,
  theme,
  onClick,
  px,
  py,
  text
}) {
  const paddingX = px ? `px-${px}` : 'px-4'
  const paddingY = py ? `py-${py}` : 'py-1'

  const color = colorMap[theme]?.text
  const bgColor = colorMap[theme]?.bg
  const borderColor = colorMap[theme]?.border

  return (
    <div
      onClick={onClick}
      className={`hover:cursor-pointer min-w-min flex justify-center box-border items-center rounded-3xl border ${paddingX} ${paddingY} ${color} ${bgColor} ${borderColor}`}
    >
      <p className={className}>{text}</p>
    </div>
  )
}
