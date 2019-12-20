import React,{Component,Fragment} from 'react';
import { Menu, Icon } from 'antd';
import "../../common/css/menulist.scss"
const { SubMenu } = Menu;

class MenuList extends Component{
    render(){
        return (
            <Fragment>
                <Menu
                mode="inline"
                className="menu-list"
                >
                <div className="supervise-back">
                    <img className="supervise" src={require("../../common/img/supervise.png")} />
                    <span>运营后台</span>
                </div>
                <SubMenu
                key="sub1"
                title={
                    <span>
                    <Icon type="mail" />
                    <span>订单查询</span>
                    </span>
                }
                >
                </SubMenu>
                    <SubMenu
                    key="sub2"
                    title={
                        <span>
                        <Icon type="appstore" />
                        <span>Navigation Two</span>
                        </span>
                    }
                    >
                    {/* <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item> */}
                    <SubMenu key="sub3" title="Submenu">
                        {/* <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item> */}
                    </SubMenu>
                </SubMenu>
                </Menu>
            </Fragment>
        )
    }
}
export default MenuList;