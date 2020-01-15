import React ,{Component, Fragment}from 'react';
import {HashRouter as Router,Route,Switch,Redirect,withRouter,BrowserRouter} from 'react-router-dom'
import Home from '@/views/home/home';
import Login from '@/views/login/login'
// import { withRouter } from 'react-router-dom'
import "antd/dist/antd.css"
import "@/common/css/reset.css"
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLogin:false,
      defaultPath:'/home'
    }
  }
  render(){
    let {isLogin,defaultPath} = this.state
      return (
          <Fragment>
            {/* <Router> */}
            {/* <HashRouter history={customHistory}> */}

              <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Redirect exact path="/" to='/login'></Redirect>
              </Switch>
            {/* </Router> */}
            {/* </HashRouter> */}
            <Home style={{display:isLogin?'block':'none'}}></Home>
          </Fragment>
      );
  }
  componentWillMount(){
    if(localStorage.getItem('token')){
      this.setState({
        isLogin:true
      })
      // this.props.history.push({pathname:'/home'})
    }else{
      this.setState({
        isLogin:false
      })
      // this.props.history.push({pathname:'/login'})
    }
  }
}
export default withRouter(App);
