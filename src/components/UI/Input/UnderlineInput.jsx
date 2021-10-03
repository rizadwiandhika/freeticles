import React from 'react'

export default function UnderlineInput({
  className,
  type = 'text',
  name,
  value,
  onChange
}) {
  return (
    <div className={className}>
      <input
        autoComplete="off"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="p-0 text-lg text-center w-full border-none focus:ring-transparent"
      />
    </div>
  )
}
