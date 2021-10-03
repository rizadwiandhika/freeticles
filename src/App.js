import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Profile from './pages/profile'
import Post from './pages/post'
import Search from './pages/search'
import CreateArticle from './pages/create-article'
import Home from './pages'

function App(props) {
  // * Ngga butuh authenticate in the first-place karena
  // * localStorage udah auto masuk ke redux
  return (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/post" component={Post} />
      <Route path="/create-article" component={CreateArticle} />
      <Route path="/search" component={Search} />
      <Route exact path="/" component={Home} />
      <Route render={() => 'Not found'} />
    </Switch>
  )
}

export default App
