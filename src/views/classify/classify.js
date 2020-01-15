import React,{Component,Fragment} from 'react';
import { Row,Form,Input,Table,Button,Select,Modal } from 'antd';
import {getBig,addBig,updateBig,deleteBig,getSmall,updateSmall,addSmall,deleteSmall,getSmallByBig} from '../../store/action/actionCreator'
// import {connect} from 'react-redux'
import "@/common/css/order.scss"
const { Option } = Select;
const { confirm } = Modal;
class Classify extends Component{
    constructor(props){
        super(props);
         Classify._this = this;
        this.state={
            visible:false,
            typeName:undefined,
            typeId:undefined,
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
                dataIndex:'index',
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
                            <span className="update-btn" onClick={()=>Classify._this.updateSmall(record)}>修改</span>
                            <span className="delete-btn" onClick={()=>Classify._this.deleteSmall(record)}>删除</span>
                        </Fragment>
                    )
                }

            }],//小类table
            smallList:[],
            titleSmall:'',
            visibleSmall:false,
            categoryName:undefined,
            categoryId:undefined
        }
    }
    render(){
        // const { getFieldDecorator } = this.props.form;
        let {visible,typeName,smallList,typeId,categoryId,bigClassify,bigColums,title,smallClassify,titleSmall,visibleSmall,smallColums,categoryName} = this.state
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
                                        placeholder="请选择大类"
                                        style={{ width: 200 }}
                                        value={typeId} 
                                        onChange={this.handleChange.bind(this,'typeId')}
                                    >
                                        <Option value='0'>全部</Option>
                                        {bigClassify.map(d => (
                                            <Option key={d.typeId} value={d.typeId}>{d.typeName}</Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="账单小类:">
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
                                <Form.Item >
                                <Button className="add-btn" type="primary" onClick={this.addSmall.bind(this)}>新增</Button>
                                <Button type="primary" onClick={this.getSmall.bind(this)}>查询</Button>
                                </Form.Item>
                            </Row>
                            </Form>
                        </div>
                        <Table rowKey={(record, index) => index} columns={smallColums} dataSource={smallClassify} />
                    </div>
                </div>
                <Modal
                title={title}
                visible={visible}
                onOk={this.hideModal.bind(this)}
                onCancel={()=>this.setState({visible:false})}
                className="classify-modal"
                okText="确认"
                cancelText="取消"
                >
                <Form.Item label="大类名称">
                    <Input placeholder="请输入大类名称" onChange={this.handleChange.bind(this,'typeName')} value={typeName}></Input>
                </Form.Item>
                </Modal>
                <Modal
                title={titleSmall}
                visible={visibleSmall}
                onOk={this.hideModalSmall.bind(this)}
                onCancel={()=>this.setState({visibleSmall:false})}
                okText="确认"
                cancelText="取消"
                className="classify-modal"
                >
                <Form.Item label="账单大类">
                    <Select
                    placeholder="请选择大类"
                    style={{ width: 200 }}
                    value={typeId} 
                    onChange={this.handleChange.bind(this,'typeId')}
                    >
                    <Option value='0'>全部</Option>
                    {bigClassify.map(d => (
                        <Option key={d.typeId} value={d.typeId}>{d.typeName}</Option>
                        ))}
                    </Select>  
                </Form.Item>
                <Form.Item label="小类名称">
                    <Input onChange={this.handleChange.bind(this,'categoryName')} placeholder="请输入小类名称" value={categoryName}></Input>
                </Form.Item>               
                </Modal>
            </Fragment>
        )
    }
    componentWillMount(){
        this.getBig();
        this.getSmall();
    }
    //选择输入框发生变化
    handleChange(val,e){
        var obj = {};
        if(val == 'typeId'){
            obj[val] = e
            obj['categoryId']=undefined
            this.getSmallByBig(e); 
        }else if(val == 'categoryId'){
            obj[val] = e
        }else if(val == 'categoryName' || val == 'typeName'){
            obj[val] = e.target.value
        }
        this.setState(obj);
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
                        visible:false,
                        typeId:undefined
                    })
                    this.getBig();
                }
            })
        }
    }
    //小类弹窗
    hideModalSmall(){
        if(this.state.titleSmall=='新增'){
            let params = {
                typeId:this.state.typeId,
                categoryName:this.state.categoryName
            }
            addSmall(params)
            .then((res)=>{
                if(res.ok){
                    this.setState({
                        visibleSmall:false,
                        typeId:undefined,
                        categoryName:undefined,
                    })
                    this.getBig();
                    this.getSmall();
                }
            })
        }else{
            let params = {
                typeId:this.state.typeId,
                categoryId:this.state.categoryId,
                categoryName:this.state.categoryName
            }
            updateSmall(params)
            .then((res)=>{
                if(res.ok){
                    this.setState({
                        visibleSmall:false,
                        typeId:undefined,
                        categoryId:undefined,
                        categoryName:undefined,
                        typeName:undefined
                    })
                    this.getBig();
                    this.getSmall();
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
            typeName:null,
            typeId:null,
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
        let params = {
            typeId:this.state.typeId,
            categoryId:this.state.categoryId
        }
        getSmall(params)
        .then((res)=>{
            if(res.ok){
                this.setState({
                    smallClassify:res.data
                })
            }else{
                this.setState({
                    smallClassify:res.data
                }) 
            }
        })
    }
    // 新增小类
    addSmall(val){
        this.setState({
            titleSmall:'新增',
            typeId:undefined,
            typeName:undefined,
            categoryId:undefined,
            categoryName:undefined,
            visibleSmall:true
        })
    } 
    //删除小类
    deleteSmall(val){
        confirm({
            title: '删除',
            content: '确定删除吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
             deleteSmall({categoryId:val.categoryId})
              .then((res) => {
                if(res.ok){
                   Classify._this.getSmall();
                }
              })
            },
            onCancel() {
            },
          });
    }
    //修改小类
    updateSmall(val){
        this.setState({
            titleSmall:'修改',
            typeId:val.typeId,
            typeName:val.typeName,
            categoryId:val.categoryId,
            categoryName:val.categoryName,
            visibleSmall:true
        })
    }
}

export default Classify;