import React,{Component,Fragment} from 'react';
import { Row,Form,Input,Table,DatePicker,Button  } from 'antd';
import {getFamily} from '../../store/action/actionCreator'
import {connect} from 'react-redux'
import "../../common/css/order.scss"
const { RangePicker } = DatePicker;
class Order extends Component{
    constructor(){
        super();
        // this.getFamilyList = this.getFamilyList.bind(this);
        // this.handleClick = this.handleClick.bind(this);  
    }
    render(){
        let { columns, data} = this.props
        return (
            <Fragment>
                <div className="supervise-container">
                    <div className="nav-container">订单查询</div>
                    <div className="supervise-list">
                        <div className="search">
                            <Form
                            className="form-header"
                            label-width="0"
                            >
                            <Row type="flex" justify="space-between">
                                <Form.Item label="教学点:">
                                <Input
                                    defaultValue=""
                                    placeholder="请输入教学点"
                                />
                                    <i className="supervise-search" slot="suffix" >
                                    </i>
                                </Form.Item >
                                <Form.Item label="教师姓名:">
                                <Input
                                    defaultValue=""
                                    placeholder="请输入教师姓名"
                                />
                                    <i className="supervise-search" slot="suffix" >
                                    </i>
                                </Form.Item>
                                <Form.Item label="结算金额:">
                                <Input
                                    defaultValue=""
                                    placeholder="请输入结算金额"
                                />
                                </Form.Item>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Form.Item label="法律主体:">
                                <Input
                                    placeholder="请输入法律主体"
                                    defaultValue=""
                                />
                                    <i className="supervise-search" slot="suffix" >
                                    </i>
                                </Form.Item>
                                <Form.Item label="订单日期:">
                                <RangePicker
                                placeholder={['开始日期', '结束日期']}
                                format="YYYY-MM-DD"
                                />
                                </Form.Item>
                                <Form.Item >
                                <Button onClick={this.props.getFamilyList} >查询</Button>
                                </Form.Item>
                            </Row>
                            </Form>
                        </div>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </Fragment>
        )
    }
}
const mapDispatchToProps = (dispatch)=>({
    getFamilyList(){
        getFamily(dispatch);
    }
})
const mapStateToProps = (state)=>({
    columns:state.reducer.columns,
    data:state.reducer.data
})
export default connect(mapStateToProps,mapDispatchToProps)(Order);