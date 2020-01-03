import React,{Component,Fragment} from 'react';
import { Menu, Icon } from 'antd';
import "../../common/css/menulist.scss"
// const { SubMenu } = Menu;
import {NavLink} from 'react-router-dom'
class MenuList extends Component{
    constructor(){
        super();
        this.state = {
            defaultKey:['family']
        }
    }
    render(){
        let {defaultKey} = this.state;
        console.log(defaultKey)
        return (
            <Fragment>
                <Menu
                mode="inline"
                className="menu-list"
                defaultSelectedKeys={defaultKey}
                // onClick={selectMenu}
                >
                <div className="supervise-back">
                    <img className="supervise" src={require("../../common/img/supervise.png")} />
                    <span>运营后台</span>
                </div>
                    <Menu.Item key="family">
                        <NavLink to="/order">
                            <Icon type="pie-chart" />
                            <span>家庭管理</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="classification">
                    <NavLink to="/classify">
                        <Icon type="desktop" />
                        <span>分类管理</span>
                        </NavLink>
                    </Menu.Item> 
                    <Menu.Item key="bill">
                        <NavLink to="/bill">
                        <Icon type="inbox" />
                        <span>账单管理</span>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Fragment>
        )
    };
    componentWillMount(){
        var key = window.location.href.split('#')[1]
        switch(key){
            case '/classify':
                this.setState({
                    defaultKey:['classification']
                },()=>{
                });
                break
            case '/family':
                this.setState({
                    defaultKey:['family']
                });
                break
            case '/bill':
                this.setState({
                    defaultKey:['bill']
                },()=>{

                });
                break
        }
    }
}
export default MenuList;