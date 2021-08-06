import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/home/index'
import Page from './components/login'
import Login from './components/login/index'
import Signup from './components/signup'
import Chat from './components/Chat/index'
import SelectContact from './components/Chat/selectContactToMessage.js/SelectContact'


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/page" component={Page} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/chat" component={Chat} />
        <Route path="/select_contact" component={SelectContact} />
      </Switch>
    </Router>
  )
}