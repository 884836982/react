import React,{Component,Fragment} from 'react';
import "../../common/css/login.scss"
import {login} from '../../store/action/actionCreator'
import {Input} from 'antd'
class Login extends Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            userSrcN: require("../../common/img/userN.svg"),
            userSrcY: require("../../common/img/userY.svg"),
            passwordSrcN: require("../../common/img/passwordN.svg"),
            passwordSrcY: require("../../common/img/passwordY.svg"),
        }
        this.login = this.login.bind(this)
        this.changeUse = this.changeUse.bind(this)
        this.changePsd = this.changePsd.bind(this)
    }
    render(){
        let {username,password,userSrcN,passwordSrcN,userSrcY,passwordSrcY} = this.state
        return (
            <Fragment>
                 <div className="login">
                    <header>
                    <p className="left">
                        <span>教师基地平台</span>
                        <i>欢迎登录</i>
                    </p>
                    <p className="right">
                        <img className="user-avator" src="../../common/img/avator.svg" alt="" />
                        <span className="login-status">未登录</span>
                    </p>
                    </header>
                    <section className="account">
                    <h2>账号登录</h2>
                    <div className="user-name">
                        <img src={username==""?userSrcN:userSrcY} alt="" />
                        <Input
                        placeholder="请输入用户名"
                        type="text"
                        onChange = {this.changeUse}
                        />
                    </div>
                    <div className="user-password">
                        <img src={password==""?passwordSrcN:passwordSrcY} alt="" />
                        <Input
                        type="password"
                        onChange = {this.changePsd}
                        placeholder="请输入密码"
                        />
                    </div>
                    <p className="forget-password">忘记密码?</p>
                    <button className={username && password ? 'login-in' : 'login'} onClick={this.login}>
                        登录
                    </button>
                    </section>
                    <footer className="footer">
                    <p className="footer-top">
                        北京学而思教师基地有限公司&nbsp;&nbsp;&nbsp;地址：XXX&nbsp;&nbsp;&nbsp;关于我们
                        / 联系我们 / 加入我们 / 支付方式 / 隐私保护政策
                    </p>
                    <p className="footer-bottom">
                        Copyright&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-2019&nbsp;&nbsp;www.jiaoshijidi.com&nbsp;&nbsp;All&nbsp;&nbsp;Rights&nbsp;京XXX号&nbsp;&nbsp;京公网备案XXX
                    </p>
                    </footer>
                </div>
            </Fragment>
        )
    }
    componentDidUpdate(newProps,newState){
        console.log(newProps,newState)
    }
    // 登录
    login(){
        let params = {
            userName:this.state.username,
            passWord:this.state.password
        }
        login(params).then((res)=>{
            console.log(res);
            localStorage.setItem('token',res.data);
            localStorage.setItem('name',res.msg);
            console.log(this.props)
            // this.props.history.push({path:'/order'})
        })
    }
    // 密码输入
    changePsd(e){
        this.setState({
            password:e.target.value
        },()=>{
            console.log(this.state.password);
        })
    }
    // 用户名输入
    changeUse(e){
        this.setState({
            username:e.target.value
        },()=>{
            console.log(this.state.username);
        })
    }
}
export default Login;
