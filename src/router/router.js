import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from '../views/home/home';
import Login from '../views/login/login'
class router extends Component{
  render(){
      return (
          <HashRouter>
              <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Redirect exact path="/" to='/login'></Redirect>
              </Switch>
          </HashRouter>
      )
  }
}
export default router