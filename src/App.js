import React ,{Component, Fragment}from 'react';
import Home from './views/home/home';
import Login from './views/login/login'

import "antd/dist/antd.css"
import "./common/css/reset.css"

class App extends Component{
  constructor(){
    super()
    this.state = {
      isLogin:false
    }
  }
  render(){
    let {isLogin} = this.state
    console.log(isLogin)
    if(isLogin){
      return (
        // <Provider store={store}>
          <Fragment>
            <Home></Home>
            {/* <Login></Login> */}
          </Fragment>
        // </Provider>
      );
    }else{
      return (
        <Fragment>
          <Login></Login>
        </Fragment>
      )
    }
    
  }
  componentWillMount(){
    if(localStorage.getItem('token')){
      this.state.isLogin = true
    }else{
      this.state.isLogin = false
    }
  }
}
export default App;
