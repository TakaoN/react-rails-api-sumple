import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import List from './List';
import New from './New';
import Show from './Show'
import Edit from './Edit'

const App = () => (
  <Router>
    <div>
      <AppHeader />
      <Switch>
        <Route exact path='/new' component={ New } />
        <Route exact path='/message/:id' component={ Show } />
        <Route exact path='/message/:id/edit' component={ Edit }/>
        <Route exact path='/' component={ List }/>
      </Switch>
      <AppFooter />
    </div>
  </Router>
)

const AppHeader = () => (
  <div>
    <h3>Message App</h3>
    <p>
      <Link to="/">[Home]</Link>
      <Link to="/new">[New Message]</Link>
    </p>
  </div>
)

const AppFooter = () => (
  <div>
    <p>
      Message App Footer
    </p>
  </div>
)

export default App
