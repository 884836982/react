import React,{Component,Fragment} from 'react';
import { Menu, Icon } from 'antd';
import "../../common/css/menulist.scss"
// const { SubMenu } = Menu;
import {NavLink} from 'react-router-dom'
class MenuList extends Component{
    render(){ 
        return (
            <Fragment>
                <Menu
                mode="inline"
                className="menu-list"
                defaultSelectedKeys={["family"]}
                onClick={selectMenu}
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

    }
}
function selectMenu(e){
    console.log();
    switch(e.key){
        case 'family':


    }
}
export default MenuList;