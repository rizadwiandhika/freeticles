import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserCircleIcon, BookmarkIcon } from '@heroicons/react/outline'

import LabelRounded from '../UI/LabelRounded'
import NavSearch from '../../containers/Navbar/NavSearch'

export default function Navbar({ sticky, shadow, children }) {
  const shadowStyle = shadow ? 'shadow-navbar-theme' : ''

  // Flex -> default jadi items-stretch
  let navbar = (
    <nav className={`flex box-border h-16 bg-white ${shadowStyle}`}>
      <div className="flex w-11/12 max-w-screen-xl my-3 mx-auto">
        <div className="flex-grow flex-shrink-0 flex items-center">
          <NavLink className="font-bold" to="/">
            FREETICLES LOGO
          </NavLink>
        </div>
        <div className="flex-grow-0 flex-shrink-0 flex items-center gap-4">
          {children}
        </div>
      </div>
    </nav>
  )

  if (sticky)
    navbar = <div className="sticky z-50 top-0 left-0 right-0">{navbar}</div>

  return navbar
}

function getNavbarItems({ name, payload }) {
  switch (name) {
    case 'notAuthenticated':
      return (
        <>
          <NavSearch />
          <p
            onClick={payload.openOverlay}
            className="hover:cursor-pointer ml-4"
          >
            Sign In
          </p>
          <LabelRounded theme="blue" text="Get started" />
        </>
      )

    case 'authenticated':
      return (
        <>
          <NavSearch />
          <BookmarkIcon
            width="24px"
            className="text-gray-500"
            // fill="white"
          />
          <UserCircleIcon width="24px" className="text-gray-500" />
        </>
      )

    case 'profile':
      return (
        <>
          <NavSearch />
          <UserCircleIcon width="24px" className="text-gray-700" />
        </>
      )
    case 'notAuthenticatedSearch':
      return (
        <>
          <p className="ml-4">
            <a href="/">Sign In</a>
          </p>
          <LabelRounded theme="blue" text="Get started" />
        </>
      )

    case 'authenticatedSearch':
      return (
        <>
          <BookmarkIcon
            width="24px"
            className="text-gray-500"
            // fill="white"
          />
          <UserCircleIcon width="24px" className="text-gray-500" />
        </>
      )

    default:
      break
  }
}
