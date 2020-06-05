import React,{Component,Fragment} from 'react';
import { Menu, Icon } from 'antd';
import "../../common/css/menulist.scss"
import {NavLink,withRouter} from 'react-router-dom'
class MenuList extends Component{
    constructor(props){
        super(props);
        this.state = {
            defaultKey:['family']
        }
    }
    render(){
        let {defaultKey} = this.state;
        return (
            <Fragment>
                <Menu
                mode="inline"
                className="menu-list"
                defaultSelectedKeys={defaultKey}
                selectedKeys={defaultKey}
                onClick={this.selectMenu.bind(this)}
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
        var key = window.location.href;
        console.log(key);
        if(key.indexOf('/classify') !==-1){
            this.setState({
                defaultKey:['classification']
            }); 
        }else if(key.indexOf('/order') !==-1){
            this.setState({
                defaultKey:['family']
            });
        }else if(key.indexOf('/bill') !==-1){
            this.setState({
                defaultKey:['bill']
            });
        }
    }
    selectMenu(e){
        this.setState({
            defaultKey:e.keyPath
        })  
    }
    componentWillReceiveProps(nextProps) {
        var path = nextProps.location.pathname;
        switch(path){
            case '/classify':
                this.setState({
                    defaultKey:['classification']
                });
                break
            case '/order' :
                this.setState({
                    defaultKey:['family']
                });
                break
            case '/bill':
                this.setState({
                    defaultKey:['bill']
                });
                break
        }
     }   
}
export default withRouter(MenuList);