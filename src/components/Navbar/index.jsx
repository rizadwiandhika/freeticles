import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserCircleIcon, BookmarkIcon } from '@heroicons/react/outline'

import LabelRounded from '../UI/LabelRounded'
import Search from './Search'

const navbarItems = {
  notAuthenticated: (
    <>
      <Search />
      <p className="ml-4">
        <a href="/">Sign In</a>
      </p>
      <LabelRounded theme="blue" text="Get started" />
    </>
  ),
  authenticated: (
    <>
      <Search />
      <BookmarkIcon
        width="24px"
        className="text-gray-500"
        // fill="white"
      />
      <UserCircleIcon width="24px" className="text-gray-500" />
    </>
  ),
  profile: (
    <>
      <Search />
      <UserCircleIcon width="24px" className="text-gray-700" />
    </>
  ),
  notAuthenticatedSearch: (
    <>
      <p className="ml-4">
        <a href="/">Sign In</a>
      </p>
      <LabelRounded theme="blue" text="Get started" />
    </>
  ),
  authenticatedSearch: (
    <>
      <BookmarkIcon
        width="24px"
        className="text-gray-500"
        // fill="white"
      />
      <UserCircleIcon width="24px" className="text-gray-500" />
    </>
  )
}

export default function Navbar({
  mode = '',
  noSticky = false,
  noShadow = false,
  children
}) {
  const items = navbarItems[mode]
  const navbar = (
    <nav
      className={`flex box-border h-16 bg-white ${
        noShadow ? '' : 'shadow-navbar-theme'
      }`}
    >
      <div className="flex w-11/12 max-w-screen-xl my-3 mx-auto">
        <div className="flex-grow flex-shrink-0 flex items-center">
          <NavLink className="font-bold" to="/">
            FREETICLES LOGO
          </NavLink>
        </div>
        <div className="flex-grow-0 flex-shrink-0 flex items-center gap-4">
          {children}
          {items}
        </div>
      </div>
    </nav>
  )

  // Flex -> default jadi items-stretch
  return noSticky ? (
    navbar
  ) : (
    <div className="sticky z-50 top-0 left-0 right-0">{navbar}</div>
  )
}

/* <nav className="flex box-border h-16 py-3 bg-yellow-100">
  <div className="flex-grow flex-shrink-0">kanan</div>
  <div className="flex-grow-0 flex-shrink-0 flex">
    <div>kiri</div>
  </div>
</nav> */
/* 
<nav className="flex justify-center h-16 bg-yellow-100">
  <div className="w-full max-w-6xl mx-6 md:mx-12 lg:mx-16 bg-white">
    <div className="h-full flex items-center">
      <div className="flex-grow flex-shrink-0">Freeticles Logo</div>
      <div className="flex-grow-0 flex-shrink-0">
        <div className="flex gap-4 justify-end items-center">
          {props.children}
          <input
            className="text-small h-full"
            value={props.value}
            placeholder="Search on..."
            onChange={props.changed}
            type="text"
            name="query"
            id="query"
          />
        </div>
      </div>
    </div>
  </div>
</nav>
*/
