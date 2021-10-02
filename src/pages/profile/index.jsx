import React from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/outline'

import Navbar from '../../components/Navbar'
import Search from '../../components/Navbar/Search'
import ReadingList from './reading-list'
import YourArticle from './your-article'

export default function Profile(props) {
  // TODO: if not authenticated -> redirect to home

  return (
    <>
      <Navbar shadow>
        <Search />
        <UserCircleIcon width="24px" className="text-gray-700" />
      </Navbar>

      <div className="w-11/12 max-w-screen-xl mx-auto">
        <div className="my-16 mx-auto max-w-screen-md">
          <div className="my-8 flex gap-8 border-b border-gray-300 ">
            <NavLink
              to="/profile/reading-list"
              activeClassName="pb-2 border-b border-gray-600"
            >
              Reading list
            </NavLink>

            <NavLink
              to="/profile/your-article"
              activeClassName="pb-2 border-b border-gray-600"
            >
              Your article
            </NavLink>
          </div>
          <Switch>
            <Route path="/profile/reading-list" component={ReadingList} />
            <Route path="/profile/your-article" component={YourArticle} />
            <Redirect to="/profile/reading-list" />
          </Switch>
        </div>
      </div>
    </>
  )
}
