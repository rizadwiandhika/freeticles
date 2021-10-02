import React from 'react'

export default function UnderlineInput({
  className,
  name,
  value,
  handleChange
}) {
  return (
    <div className={className}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className="p-0 text-lg text-center w-full border-none focus:ring-transparent"
      />
    </div>
  )
}
