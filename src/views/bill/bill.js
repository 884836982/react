import React,{Component,Fragment} from 'react';
import { Row,Form,Input,Table,DatePicker,Button,Select, } from 'antd';
import moment from 'moment';
import {getBillList,getBig,getSmallByBig} from '../../store/action/actionCreator'
import {connect} from 'react-redux'
import "../../common/css/order.scss"
import {format} from '../../utils/format'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { RangePicker } = DatePicker;
const { Option } = Select;
class Bill extends Component{
    constructor(props){
        super(props);
        Bill._this = this;
        this.state={
            typeId:undefined,//大类Id
            typeName:undefined,//大类名称
            bigClassify:[],//账单大类
            smallList:[],//账单小类
            categoryId:undefined,//小类Id
            categoryName:undefined,//小类名称
            billType:undefined,//收支
            billColumns:[{
                title:'序号',
                key:'index',
                render: (text,record,index) => {
                    return `${index+1}`
                }
            },{
                title:'账单收支',
                dataIndex:'billRecPayType'
            },{
                title:'账单大类',
                dataIndex:'typeName'
            },{
                title:'账单小类',
                dataIndex:'categoryName'
            },{
                title:'账单日期',
                dataIndex:'dateTime'
            },{
                title: '操作',
                key: 'operator',
                render(text, record) {
                    return (
                        <Fragment>
                            <span className="delete-btn" onClick={()=>Bill._this.deleteSmall(record)}>删除</span>
                        </Fragment>
                    )
                }  
            }],//账单Table
            billData:[],
            startTime:null, //账单开始日期
            endTime:null,//账单结束日期
            pageSize:'',
            currentPage:'',
        }
    }
    render(){
        let {billColumns,startTime,endTime,billData,billType,typeId,typeName,bigClassify,smallList,categoryName,categoryId} = this.state
        return (
            <Fragment>
                <div className="supervise-container">
                    <div className="nav-container">账单管理</div>
                    <div className="supervise-list">
                        <div className="search">
                            <Form
                            className="form-header"
                            label-width="0"
                            >
                            <Row type="flex" justify="space-between">
                                <Form.Item label="账单收支">
                                    <Select
                                        placeholder="请选择收支"
                                        style={{ width: 200 }}
                                        value={billType} 
                                        onChange={this.handleChange.bind(this,'billType')}
                                    >
                                        <Option value='0'>全部</Option>
                                        <Option value={1}>收入</Option>
                                        <Option value={2}>支出</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="账单大类">
                                    <Select
                                        placeholder="请选择大类"
                                        style={{ width: 200 }}
                                        value={typeId} 
                                        onChange={this.handleChange.bind(this,'typeId')}
                                    >
                                        <Option value={0}>全部</Option>
                                        {bigClassify.map(d => (
                                            <Option key={d.typeId} value={d.typeId}>{d.typeName}</Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="账单小类">
                                    <Select
                                        placeholder="请选择小类"
                                        style={{ width: 200 }}
                                        value={categoryId} 
                                        onChange={this.handleChange.bind(this,'categoryId')}
                                    >
                                        <Option value='0'>全部</Option>
                                        {smallList.map(d => (
                                            <Option key={d.categoryId} value={d.categoryId}>{d.categoryName}</Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Form.Item label="账单日期">
                                <RangePicker onChange={this.handleChange.bind(this,'time')} placeholder={['开始日期', '结束日期']} value={startTime==null && endTime == null? null:[moment(startTime,'YYYY-MM-DD'),moment(endTime,'YYYY-MM-DD')]} format={'YYYY-MM-DD'}></RangePicker>
                                </Form.Item>
                                <Form.Item >
                                <Button onClick={this.props.getBillList} >查询</Button>
                                </Form.Item>
                            </Row>
                            </Form>
                        </div>
                        <Table columns={billColumns} dataSource={billData} />
                    </div>
                </div>
            </Fragment>
        )
    }
    componentWillMount(){
        // this.getBillList();
        this.getBig();
    }
    handleChange(val,e){
        var obj = {};
        if(val == 'typeId'){
            obj[val] = e
            obj['categoryId'] = undefined;
            this.getSmallByBig(e); 
        }else if(val == 'categoryId'){
            obj[val] = e
        }else if(val == 'categoryName' || val == 'typeName'){
            obj[val] = e.target.value
        }else if(val == 'time'){
            if(format(e[0],'YYYY-MM-DD') =='NaN-NaN-NaN'){
                obj['startTime'] = null
            }else {
                obj['startTime'] = format(e[0],'YYYY-MM-DD')
            }
            if(format(e[1],'YYYY-MM-DD') =='NaN-NaN-NaN'){
                obj['endTime'] = null
            }else {
                obj['endTime'] = format(e[1],'YYYY-MM-DD')
            }
        }else if(val == 'billType'){
            obj[val] = e
        }
        this.setState(obj);
    }
    // 获取大类列表
    getBig(){
        getBig()
        .then((res)=>{
            if(res.ok){
                this.setState({
                    bigClassify:res.data
                })
            }
        })
    }
    //根据大类id获取小类
    getSmallByBig(id){
        let params = {
            typeId:id
        }
        getSmallByBig(params)
        .then((res)=>{
            if(res.ok){
                this.setState({
                    smallList:res.data
                })
            }
        })
    }
    getBillList(){
        let params = {
            pageSize:this.state.pageSize,
            currPage:this.state.currentPage,
            startBillTime:this.state.startTime,
            endBillTime:this.state.endTime,
            billType:this.state.typeId,
            billCategory:this.state.categoryId,
            billRecPayType:this.state.billType
        }
        getBillList(params)
        .then((res)=>{
            console.log(res);
            if(res.ok){
                this.setState({
                    billData:res.data
                })
            }
        })
    }
}
// const mapDispatchToProps = (dispatch)=>({
//     getFamilyList(){
//         getFamily(dispatch);
//     }
// })
// const mapStateToProps = (state)=>({
//     columns:state.reducer.columns,
//     data:state.reducer.data
// })

export default Bill;