import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/outline'
import MenuDropdown from '../../../UI/MenuDropdown'

export default function AvatarIcon(props) {
  return (
    <MenuDropdown>
      <UserCircleIcon
        width={24}
        className="hover:cursor-pointer text-gray-500"
      />
      <>
        <li className="my-4 text-gray-500 hover:cursor-pointer hover:text-black ">
          <NavLink to="/profile/your-article">Your articles</NavLink>
        </li>
        <li className="my-4 text-gray-500 hover:cursor-pointer hover:text-black ">
          <NavLink to="/profile/reading-list">Reading list</NavLink>
        </li>
        <hr />
        <li className="my-4 text-gray-500 hover:cursor-pointer hover:text-black ">
          <p>Sign Out</p>
        </li>
      </>
    </MenuDropdown>
  )
}
