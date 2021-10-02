import React from 'react'

export default function Comment({ className }) {
  return (
    <div className={className}>
      <p className="font-bold">
        Hafidz Ariq{' '}
        <span className="ml-2 font-normal text-gray-500">3 months ago</span>
      </p>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Voluptate, itaque?
      </p>
    </div>
  )
}
