import React from 'react'

export default function Input(props) {
  return (
    <div>
      <label className="block" htmlFor={props.id}>
        {props.label}
      </label>

      <div className="border border-gray-600 rounded-xl">
        <input type={props.type} name={props.id} id={props.id} />
      </div>
    </div>
  )
}
