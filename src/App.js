import { Switch, Route } from 'react-router-dom'

import CreateArticle from './pages/CreateArticle'
import Home from './pages/Home'

function App(props) {
  return (
    <Switch>
      <Route path="/create-article" component={CreateArticle} />
      <Route exact path="/" component={Home} />
      <Route render={() => 'Not found'} />
    </Switch>
  )
}

export default App
