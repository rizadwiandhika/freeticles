import React from 'react'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from '../../components/Navbar'
import NavSearch from '../../containers/Navbar/NavSearch'
import AvatarItem from '../../components/Navbar/Items/Item/AvatarItem'
import ReadingList from './reading-list'
import YourArticle from './your-article'

export default function Profile(props) {
  const user = useSelector((state) => state.user)
  const isAuth = user.username && user.password

  if (!isAuth) {
    return <Redirect to="/" />
  }

  return (
    <>
      <Navbar shadow>
        <NavSearch />
        <AvatarItem />
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
