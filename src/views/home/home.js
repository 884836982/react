import React ,{Component, Fragment} from "react";
// import {connect} from "react-redux";
// import Header
import { Layout } from 'antd';
import MenuList from '../../components/menu/menulist'
import Order from '../order/order'
import Login from '../login/login';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import "../../common/css/home.scss"
const { Header, Footer, Sider, Content } = Layout;

class Home extends Component{
    render(){
        // let {userName} = this.props;
        return (
            <Fragment>
                <div className="page">
                    <Header className="header">
                    <h1 className="header-title">
                        <i className="header-icon"></i><span>家庭记账平台</span>
                    </h1>
                    <div className="login">
                        <span className="title">运营后台</span>
                        <p className="user-name">
                            <img src={require("../../common/img/initAvator.svg")} alt /><span>李四</span>
                        </p>
                        <span className="login-out">退出</span>
                    </div>
                    </Header>
                    <Layout className="container">
                        <Sider className="sidebar-container">
                            <MenuList></MenuList>
                        </Sider>
                        <Content class="content-container">
                            <Router>
                                <div>
                                <Switch>
                                    <Route path="/order" component={Order}></Route>
                                    <Route path="/login" component={Login}></Route>
                                    <Redirect path="/home" to="/order"></Redirect>
                                </Switch>
                                </div>
                            </Router>
                        </Content>
                        {/* <Sider>right sidebar</Sider> */}
                    </Layout>
                    {/* <el-container class="container">
                    <el-aside class="sidebar-container">
                        <!-- <transition-group appear name="fade" mode="out-in"> -->
                        <router-view name="sidebar"></router-view>
                        <!-- </transition-group> -->
                    </el-aside>
                    <el-container class="content-container">
                        <el-main class="main-container">
                        <!-- <transition appear name="fade" mode="out-in"> -->
                        <router-view :key="$route.path"></router-view>
                        <!-- </transition> -->
                        </el-main>
                    </el-container>
                    </el-container> */}
                    <Footer className="footer">
                    <p className="footer-top">
                        北京&nbsp;&nbsp;&nbsp;地址：XXX&nbsp;&nbsp;&nbsp;关于我们
                        / 联系我们 / 加入我们 / 支付方式 / 隐私保护政策
                    </p>
                    <p className="footer-bottom">
                        Copyright&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-2019&nbsp;&nbsp;www.jiaoshijidi.com&nbsp;&nbsp;All&nbsp;&nbsp;Rights&nbsp;京XXX号&nbsp;&nbsp;京公网备案XXX
                    </p>
                    </Footer>
                </div>
            </Fragment>  
        );
    }
}
export default Home;