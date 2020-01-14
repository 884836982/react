import React,{Component,Fragment} from 'react';
import { Row,Form,Input,Table,Modal,DatePicker,Button,Select, } from 'antd';
import moment from 'moment';
import {getBillList,getBig,billDetails,getSmallByBig,addBill,updateBill,deleteBill} from '../../store/action/actionCreator'
import {connect} from 'react-redux'
import "../../common/css/order.scss"
import {format} from '../../utils/format'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;
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
                title:'创建日期',
                dataIndex:'createTime',
                render:(text,record)=>{
                    return format(text,'YYYY-MM-DD')
                }
            },{
                title:'账单收支',
                dataIndex:'billRecPayType'
            },{
                title:'账单大类',
                dataIndex:'billType'
            },{
                title:'账单小类',
                dataIndex:'categoryName'
            },{
                title:'账单金额',
                dataIndex:'billAmount'
            },{
                title:'账户余额',
                dataIndex:'billBalance'
            },{
                title:'账单日期',
                dataIndex:'billTime',
                render:(text,record)=>{
                    return format(text,'YYYY-MM-DD')
                }
            },{
                title:'备注',
                dataIndex:'mark'
            },{
                title: '操作',
                key: 'operator',
                render(text, record) {
                    return (
                        <Fragment>
                            <span className="update-btn" onClick={()=>Bill._this.updateBill(record)}>修改</span>
                            <span className="delete-btn" onClick={()=>Bill._this.deleteBill(record.billId)}>删除</span>
                        </Fragment>
                    )
                }  
            }],//账单Table
            billData:null,
            startTime:null, //账单开始日期
            endTime:null,//账单结束日期
            pageSize:10,
            currentPage:1,
            total:0,
            title:'',//弹窗标题
            visibile:false,
            billAmount:undefined,//账单金额
            mark:undefined,//备注
            billTime:undefined,
            billId:'',//账单id
        }
    }
    render(){
        let {billColumns,billTime,billAmount,mark,visible,title,total,startTime,endTime,billData,billType,typeId,typeName,bigClassify,smallList,categoryName,categoryId} = this.state
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
                                <Button type="primary" className="add-btn" onClick={this.addBill.bind(this)} >新增</Button>
                                <Button onClick={this.getBillList.bind(this)} >查询</Button>
                                </Form.Item>
                            </Row>
                            </Form>
                        </div>
                        <Table 
                            pagination={{
                                defaultPageSize:10,
                                total:total,
                                showTotal: () => `共 ${total} 条数据`,
                                showSizeChanger:true,
                                pageSizeOptions: ['10', '20', '30', '50'],
                                onChange:this.onShowSizeChange.bind(this),
                                onShowSizeChange:(current, pageSize)=>{Bill._this.onShowSizeChange(current,pageSize)}
                              }
                            }
                            rowKey={(record) => record.billId}
                            
                            columns={billColumns} 
                            dataSource={billData} />
                    </div>
                </div>
                <Modal
                title={title}
                visible={visible}
                onOk={this.hideModal.bind(this)}
                onCancel={()=>this.setState({visible:false})}
                className="bill-modal"
                okText="确认"
                cancelText="取消"
                >
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
                    <Form.Item label="账单日期">
                        <DatePicker 
                        onChange={this.handleChange.bind(this,'billTime')} 
                        placeholder='请选择账单日期' 
                        value={billTime?moment(billTime,'YYYY-MM-DD'):null} 
                        format={'YYYY-MM-DD'} 
                        />
                    </Form.Item>
                    <Form.Item label="账单金额">
                        <Input value={billAmount} placeholder="请输入账单金额" onChange={this.handleChange.bind(this,'billAmount')} ></Input>
                    </Form.Item>
                    <Form.Item label="备注">
                        <Input value={mark} placeholder="请输入备注" onChange={this.handleChange.bind(this,'mark')} ></Input>
                    </Form.Item>
                </Modal>
            </Fragment>
        )
    }
    componentWillMount(){
        this.getBillList();
        this.getBig();
    }
    //分页处理
    onShowSizeChange(current,pageSize){
        this.setState({
            currentPage:current,
            pageSize:pageSize
        },()=>{
        this.getBillList();
        })
    }
    //输入框、选择框值发生变化
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
        }else if(val == 'billTime'){
            if(format(e,"YYYY-MM-DD")== 'NaN-NaN-NaN'){
                obj[val]=null
            }else{
                obj[val] = format(e,'YYYY-MM-DD')
            }
        }else {
            obj[val] = e.target.value
        }
        this.setState(obj);
    }
    //弹窗确定按钮
    hideModal(){
        let params = {
            billType:this.state.typeId,
            billCategory:this.state.categoryId,
            billRecPayType:this.state.billType,
            billTime:this.state.billTime,
            billAmount:this.state.billAmount,
            mark:this.state.mark
        }
        if(this.state.title=='新增'){
            addBill(params)
            .then((res)=>{
                if(res.ok){
                    this.initDate()
                }
            })
        }else if(this.state.title == '修改'){
            params.billId = this.state.billId
            updateBill(params)
            .then((res)=>{
                if(res.ok){
                   this.initDate();
                }
            })
        }
    }
    //初始化数据
    initDate(){
        this.setState({
            visible:false,
            typeId:undefined,
            categoryId:undefined,
            billType:undefined,
            billTime:undefined,
            billAmount:undefined,
            mark:undefined
        })
        this.getBillList();
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
    // 页码改变的回调，参数是改变后的页码及每页条数
    // handleTable(pagination,pageSize){
    //     console.log(pageSize)
    //     this.setState({
    //         pageSize:this.state.pageSize,
    //         currentPage:pagination
    //     },()=>{
    //         this.getBillList();
    //     })
        
    // }
    //获取账单列表
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
            if(res.ok){
                this.setState({
                    total:res.data,
                    billData:res.data1
                })
            }
        })
    }
    //修改账单
    updateBill(val){
        this.setState({
            title:'修改',
            visible:true,

        })
        let params = {
            billId:val.billId
        }
        billDetails(params)
        .then((res)=>{
            if(res.ok){
                this.handleChange('typeId',res.data.billType); 
                    this.setState({
                        typeId:res.data.billType,
                        categoryId:res.data.billCategory,
                        billType:res.data.billRecPayType,
                        billTime:format(res.data.billTime,'YYYY-DD-MM'),
                        billAmount:res.data.billAmount,
                        mark:res.data.mark,
                        billId:res.data.billId
                    })
                }
        })
    }
    //删除账单
    deleteBill(val){
        confirm({
            title: '删除',
            content: '确定删除账单吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
             deleteBill({billId:val})
              .then((res) => {
                if(res.ok){
                   Bill._this.getBillList();
                }
              })
            },
            onCancel() {
            },
          });
    }
    //新增账单
    addBill(){
        this.setState({
            visible:true,
            title:'新增'
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