import React from 'react'

export default function Input(props) {
  return (
    <div className="">
      {props.label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {props.label}
        </label>
      )}
      <input
        value={props.value}
        onChange={props.handleChange}
        onFocus={props.handleFocus}
        name={props.name}
        id={props.name}
        type="text"
        placeholder={props.placeholder || 'Placeholder...'}
        className={`${
          props.touched && props.err ? 'border-red-300' : 'border-gray-300'
        } border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md`}
      />
      {props.touched && props.err && (
        <p className="mt-2 text-red-500 text-xs opacity-90">
          {props.errMessage}
        </p>
      )}
    </div>
  )
}
