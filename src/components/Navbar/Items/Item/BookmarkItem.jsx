import React from 'react'
import { NavLink } from 'react-router-dom'
import { BookmarkIcon } from '@heroicons/react/outline'

export default function BookmarkItem(props) {
  return (
    <NavLink to="/profile/reading-list">
      <BookmarkIcon width={24} className="hover:cursor-pointer text-gray-500" />
    </NavLink>
  )
}
