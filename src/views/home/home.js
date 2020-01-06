import React ,{Component, Fragment} from "react";
// import {connect} from "react-redux";
// import Header
import { Layout } from 'antd';
import MenuList from '../../components/menu/menulist'
import Order from '../order/order'
import Classify from '../classify/classify'
import Bill from '../bill/bill';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom';
import "../../common/css/home.scss"
import {Provider} from 'react-redux'
import store from '../../store'
const { Header, Footer, Sider, Content } = Layout;
class Home extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <Fragment>
                <div className="page">
                    <Router>
                        <Header className="header">
                            <h1 className="header-title">
                                <i className="header-icon"></i><span>家庭记账平台</span>
                            </h1>
                            <div className="header-login">
                                <span className="title">运营后台</span>
                                <p className="user-name">
                                    <img src={require("../../common/img/initAvator.svg")} alt="图片加载失败" /><span>{localStorage.getItem('name')}</span>
                                </p>
                                <Link to="/login"><span className="login-out">退出</span></Link>
                            </div>
                        </Header>
                        <Layout className="container">
                            <Provider store={store}>
                                    <Sider className="sidebar-container">
                                        <MenuList></MenuList>
                                    </Sider>
                                    <Content className="content-container">
                                        <div className="content-list">
                                            <Switch>
                                                <Route exact path="/order" component={Order}></Route>
                                                <Route path="/classify" component={Classify}></Route>
                                                <Route path="/bill" component={Bill}></Route>
                                                <Redirect exact path="/home" to="/order"></Redirect>
                                            </Switch>
                                        </div>
                                    </Content>
                            </Provider>
                        </Layout>
                    </Router>
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