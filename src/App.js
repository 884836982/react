import React ,{Component, Fragment}from 'react';
import Home from './views/home/home';
import Login from './views/login/login';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
// import {Provider} from 'react-redux'
// import store from './store'
import "antd/dist/antd.css"
import "./common/css/reset.css"

class App extends Component{
  render(){
    return (
      // <Provider store={store}>
      <Fragment>
        <Router>
          <div>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/login" component={Login}></Route>
              <Redirect path="/" to="/home"></Redirect>
            </Switch>
          </div>
        </Router>
      </Fragment>
      // </Provider>
    );
  }
}
export default App;
