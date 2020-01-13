import React,{Component,Fragment} from 'react';
import { Row,Form,Input,Table,DatePicker,Button,Modal ,Select} from 'antd';
import moment from 'moment';
import {getFamily,detailFamily,addFamily,deleteFamily,updateFamily} from '../../store/action/actionCreator'
import {connect} from 'react-redux'
import "../../common/css/order.scss"
import 'moment/locale/zh-cn';
import {format} from '../../utils/format'
const { Option } = Select;
const { confirm } = Modal;
moment.locale('zh-cn');
class Order extends Component{
    constructor(props){
        super(props);
        Order._this = this;
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text,record,index) => {
                    return `${index+1}`
                }
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '密码',
                dataIndex: 'passWord',
                key: 'passWord',
                width:180
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render:(text)=>{
                    if(text == 1){
                        return '女'
                    }
                    return '男'
                }
            },
            {
                title: '出生日期',
                dataIndex: 'birthday',
                key: 'birthday',
                render:(text,record)=>format(record.birthday)
            },
            {
                title: '联系方式',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '备注',
                dataIndex: 'mark',
                key: 'mark',
            },
            {
                title: '操作',
                dataIndex: 'operator',
                key: 'operator',
                render(text, record) {
                    return (
                        <Fragment>
                            <span className="update-btn" onClick={() =>{props.detailFamily(record.userId)} } >修改</span>
                            <span className="delete-btn" onClick={()=>Order._this.showDeleteConfirm(record.userId)}>删除</span>
                        </Fragment>
                    )
                }
            }
            ],
            visible:false,
            name:'',
            sex:null,
            passWord:'',
            birthday: '',
            phone:'',
            mark:'',
            userName:'',
            flag:false,
            title:''
        }
        // this.handleChange = this.handleChange.bind(this,val);
    }
    render(){
        let { columns,title,visible,userName,name,sex,passWord,birthday,phone,mark} = this.state
        let { data,familyNickName,familyBalance,} = this.props
        return (
            <Fragment>
                <div className="supervise-container">
                <div className="nav-container">家庭详情</div>
                <div className="family-detail">
                <p className="family-name"><span>家庭昵称：</span>{familyNickName}</p>
                <p className="family-account"><span>余额：</span>{familyBalance}</p>
                <Button className="family-btn">修改</Button>
                </div>
                    <div className="supervise-list">
                    <div className="nav-container">成员列表</div>
                        <div className="search">
                            <Form
                            className="form-header"
                            label-width="0"
                            >
                            <Row type="flex" justify="space-between">
                                {/* <Form.Item label="法律主体:">
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
                                </Form.Item> */}
                                <Form.Item >
                                    <Button type="primary" className="add-btn" onClick={this.addFamily.bind(this,'add')} >新增</Button>
                                    <Button  type="primary" onClick={this.props.getFamilyList} >查询</Button>
                                </Form.Item>
                            </Row>
                            </Form>
                        </div>
                        <Table rowKey={record=>record.userId} columns={columns} dataSource={data} />
                    </div>
                </div>
                <Modal
                    title={title}
                    visible={visible}
                    cancelText="取消"
                    okText = "确定"
                    onOk={this.Sure.bind(this)}
                    onCancel={()=>this.setState({visible:false})}
                    className="modal"
                    >
                    <div className="modal-form" style={{display:title=='新增'?'flex':'none'}}>
                        <span className="modal-title">用户名:</span>
                        <Input className="modal-content" onChange={this.handleChange.bind(this,'userName')} value={userName} />
                    </div>
                    <div className="modal-form">
                        <span className="modal-title">姓名:</span>
                        <Input className="modal-content" onChange={this.handleChange.bind(this,'name')} value={name} />
                    </div>
                    <div className="modal-form">
                        <span className="modal-title">性别:</span>
                        <Select  style={{ width: 120 }} value={sex==1?'女':'男'} onChange={this.handleChange.bind(this,'sex')}>
                            <Option value="1">女</Option>
                            <Option value="2">男</Option>
                        </Select>
                    </div>
                    <div className="modal-form">
                        <span className="modal-title">密码:</span>
                        <Input className="modal-content" onChange={this.handleChange.bind(this,'passWord')} value={passWord}/>
                    </div>
                    <div className="modal-form">
                        <span className="modal-title">出生日期:</span>
                        <DatePicker placeholder="请选择日期" value={birthday?moment(birthday,'YYYY-MM-DD'):null} format={'YYYY-MM-DD'} onChange={this.handleChange.bind(this,'birthday')} />
                    </div>
                    <div className="modal-form">
                        <span className="modal-title">联系方式:</span>
                        <Input className="modal-content"  onChange={this.handleChange.bind(this,'phone')} value={phone} />
                    </div>
                    <div className="modal-form">
                        <span className="modal-title">备注:</span>
                        <Input className="modal-content" type="textarea"  onChange={this.handleChange.bind(this,'mark')} value={mark} />
                    </div>
                </Modal>
            </Fragment>
        )
    }
    componentWillMount(){
        this.props.getFamilyList();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.Detail !== this.props.Detail){
            if(this.state.flag){
                this.setState({
                    name:Order._this.props.Detail.name,
                    passWord:Order._this.props.Detail.passWord,
                    sex:Order._this.props.Detail.sex,
                    birthday:Order._this.props.Detail.birthday,
                    phone:Order._this.props.Detail.phone,
                    mark:Order._this.props.Detail.mark,
                    flag:false
                })
            }
        }
    }
    handleChange(val,e){
        var Detail = {}
        if(val == 'sex'){
            Detail[val] = e
        }else if(val == 'birthday'){
            if(format(moment(e),'YYYY-MM-DD')=='NaN-NaN-NaN'){
                Detail[val] = null;
            }else{
                Detail[val] = format(e,'YYYY-MM-DD');
            }
        }else{
            Detail[val] = e.target.value
        }
        this.setState(Detail);
    }
    addFamily(){
        this.setState({
            name:'',
            passWord:'',
            sex:2,
            birthday:null,
            phone:'',
            mark:'',
            userName:'',
            title:'新增',
            visible:true
        })
    }
    showDeleteConfirm(id) {
        confirm({
          title: '删除',
          content: '确定删除吗?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
           deleteFamily({userId:id})
            .then((res) => {
                if(res.ok){
                    Order._this.props.getFamilyList();
                }
            })
          },
          onCancel() {
          },
        });
    }
    Sure(){
        if(this.state.title=='修改'){
            this.props.updateFamily();
        }else {
            let params = {
                name:this.state.name,
                mark:this.state.mark,
                phone:Order._this.state.phone,
                birthday:format(Order._this.state.birthday),
                sex:Order._this.state.sex,
                passWord:Order._this.state.passWord,
                userName:this.state.userName
            }
            addFamily(params)
            .then((res)=>{
                if(res.ok){
                    this.setState({
                        visible:false
                    })
                    this.props.getFamilyList();
                }
            })
        }
    }
}
const mapDispatchToProps = (dispatch)=>({
    //获取家庭成员列表
    getFamilyList(){
        getFamily(dispatch);
    },
    //获取家庭成员详情
    detailFamily(id){
        Order._this.setState({
            visible:true,
            flag:true,
            title:'修改'
        })
        let params = {
            userId :id
        }
        detailFamily(dispatch,params);
    },
    //修改家庭成员信息
    updateFamily(){
        let params = {
            userId:Order._this.props.Detail.userId,
            name:Order._this.state.name,
            mark:Order._this.state.mark,
            phone:Order._this.state.phone,
            birthday:format(Order._this.state.birthday),
            sex:Order._this.state.sex
        }
        updateFamily(dispatch,params)
        Order._this.setState({
            visible:false
        })
    }

})
const mapStateToProps = (state)=>({
    familyNickName:state.reducer.familyNickName,
    familyBalance:state.reducer.familyBalance,
    data:state.reducer.data,
    Detail:state.reducer.Detail,
})
export default connect(mapStateToProps,mapDispatchToProps)(Order);