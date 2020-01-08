import React,{Component,Fragment} from 'react';
import { Row,Form,Input,Table,Button,Select,Modal } from 'antd';
import {getBig,addBig,updateBig,deleteBig,getSmall,addSmall,deleteSmall} from '../../store/action/actionCreator'
// import {connect} from 'react-redux'
import "../../common/css/order.scss"
const { Option } = Select;
const { confirm } = Modal;
class Classify extends Component{
    constructor(props){
        super(props);
         Classify._this = this;
        this.state={
            visible:false,
            typeName:'',
            bigClassify:[],//大类列表
            bigColums:[{
                title:'序号',
                key:'index',
                render: (text,record,index) => {
                    return `${index+1}`
                }
            },{
                title:'大类名称',
                dataIndex:'typeName'
            },{
                title: '操作',
                key: 'operator',
                render(text, record) {
                    return (
                        <Fragment>
                            <span className="update-btn" onClick={() =>{Classify._this.updateBig(record)} } >修改</span>
                            <span className="delete-btn" onClick={()=>Classify._this.deleteBig(record.typeId)}>删除</span>
                        </Fragment>
                    )
                }

            }],//大类table
            title:'',
            smallClassify:[],//小类列表
            smallColums:[{
                title:'序号',
                render: (text,record,index) => {
                    return `${index+1}`
                }
            },{
                title:'大类名称',
                dataIndex:'typeName' 
            },{
                title:'小类名称',
                dataIndex:'categoryName' 
            },{
                title: '操作',
                key: 'operator',
                render(text, record) {
                    return (
                        <Fragment>
                            <span className="delete-btn" onClick={()=>Classify._this.deleteSmall(record)}>删除</span>
                        </Fragment>
                    )
                }

            }],//小类table
            titleSmall:'',
            visibleSmall:false
        }
    }
    render(){
        let {visible,typeName,bigClassify,bigColums,title,smallClassify,} = this.state
        return (
            <Fragment>
                <div className="supervise-container">
                    <div className="nav-container">分类管理列表</div>
                    <div className="classify-operator">账单大类列表</div>
                    <div className="classify-list">
                        <Button type="primary" className="big-btn-add" onClick = {this.addBig.bind(this)}>新增</Button>
                        <Table rowKey={record=>record.typeId} columns={bigColums} dataSource={bigClassify}></Table>
                    </div>
                    <div className="supervise-list">
                        <div className="classify-small">账单小类列表</div>
                        <div className="search">
                            <Form
                            className="form-header"
                            label-width="0"
                            >
                            <Row type="flex" justify="space-between">
                                <Form.Item label="账单大类:">
                                    <Select
                                        labelInValue
                                        // defaultValue={{ key: 'lucy' }}
                                        placeholder="请选择大类"
                                        style={{ width: 120 }}
                                        // onChange={handleChange}
                                    >
                                        <Option value='all'>全部</Option>
                                        {bigClassify.map(d => (
                                            <Option value={d.typeId}>{d.typeName}</Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item >
                                <Button onClick={this.addSmall.bind(this)}>新增</Button>
                                <Button  onClick={this.getSmall.bind(this)}>查询</Button>
                                </Form.Item>
                            </Row>
                            </Form>
                        </div>
                        {/* <Table columns={columns} dataSource={smallClassify} /> */}
                    </div>
                </div>
                <Modal
                title={title}
                visible={visible}
                onOk={this.hideModal.bind(this)}
                onCancel={()=>this.setState({visible:false})}
                okText="确认"
                cancelText="取消"
                >
                <Input onChange={this.handleChange.bind(this,'typeName')} value={typeName}></Input>
                </Modal>
                <Modal
                title={titleSmall}
                visible={visibleSmall}
                onOk={this.hideModalSmall.bind(this)}
                onCancel={()=>this.setState({visible:false})}
                okText="确认"
                cancelText="取消"
                >
                <Input onChange={this.handleChange.bind(this,'typeName')} value={typeName}></Input>
                </Modal>
            </Fragment>
        )
    }
    componentWillMount(){
        this.getBig();
        this.getSmall();
    }
    //大类弹出输入框发生变化
    handleChange(val,e){
        var obj = {};
        if(val == 'typeName'){
            obj[val] = e.target.value
        }
        this.setState(obj);
    }
    //大类弹窗确定
    hideModal(){
        if(this.state.title=='新增'){
            let params = {
                typeName:this.state.typeName
            }
            addBig(params)
            .then((res)=>{
                if(res.ok){
                    this.setState({
                        visible:false
                    })
                    this.getBig();
                }
            })
        }else if(this.state.title == '修改'){
            let params = {
                typeName:this.state.typeName,
                typeId:this.state.typeId
            }
            updateBig(params)
            .then((res)=>{
                if(res.ok){
                    this.setState({
                        visible:false
                    })
                    this.getBig();
                }
            })
        }
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
    // 新增大类
    addBig(){
        this.setState({
            title:'新增',
            typeName:'',
            typeId:'',
            visible:true
        })
    }
    // 修改大类
    updateBig(val){
        this.setState({
            title:'修改',
            visible:true,
            typeName:val.typeName,
            typeId:val.typeId,
        })
    }
    // 删除大类
    deleteBig(val){
        confirm({
            title: '删除',
            content: '确定删除吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
             deleteBig({typeId:val})
              .then((res) => {
                if(res.ok){
                   Classify._this.getBig();
                }
              })
            },
            onCancel() {
            },
          });
    }
    // 获取小类列表
    getSmall(){
        getSmall()
        .then((res)=>{
            console.log(res);
            if(res.ok){

            }
        })
    }
    // 新增小类
    addSmall(val){
        
    }
    // 删除小类
    deleteSmall(val){

    }
}

export default Classify;