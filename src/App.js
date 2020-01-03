import React ,{Component, Fragment}from 'react';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Home from './views/home/home';
import Login from './views/login/login'
import "antd/dist/antd.css"
import "./common/css/reset.css"
class App extends Component{
  constructor(){
    super();
    this.state = {
      isLogin:false
    }
  }
  render(){
    let {isLogin} = this.state
    console.log(isLogin);
      return (
          <Fragment>
            <Router>
              <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Redirect exact  path="/" to="/home"></Redirect>
              </Switch>
            </Router>
            <Home style={{display:isLogin?'block':'none'}}></Home>
          </Fragment>
      );
  }
  componentWillMount(){
    if(localStorage.getItem('token')){
      this.setState({
        isLogin:true
      })
      // this.state.isLogin = true
      // this.props.history.push({path:'/home'})
    }else{
      this.setState({
        isLogin:false
      })
      // this.state.isLogin = false
      // this.props.history.push({path:'/login'})
    }
  }
}
export default App;
