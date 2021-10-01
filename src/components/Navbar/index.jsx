import React from 'react'
import { UserCircleIcon, BookmarkIcon } from '@heroicons/react/outline'

import LabelRounded from '../UI/LabelRounded'
import Search from './Search'

const mode = {
  notAuthenticated: (
    <>
      <Search />
      <p className="ml-4">
        <a href="/">Sign In</a>
      </p>
      <LabelRounded blue text="Get started" />
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
  )
}

export default function Navbar(props) {
  const items = mode[props.mode]
  // const items = mode.notAuthenticated

  // Flex -> default jadi items-stretch
  return (
    <nav className="flex box-border h-16">
      <div className="flex w-full max-w-6xl my-3 mx-6 md:mx-12 lg:mx-16 xl:mx-auto">
        <div className="flex-grow flex-shrink-0">kanan</div>
        <div className="flex-grow-0 flex-shrink-0 flex items-center gap-4">
          {props.children}
          {items}
        </div>
      </div>
    </nav>
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
