import React,{Component,Fragment} from 'react';
import { Row,Form,Input,Table,DatePicker,Button,Select,Icon } from 'antd';
import {getClassifyList} from '../../store/action/actionCreator'
import {connect} from 'react-redux'
import "../../common/css/order.scss"
const { Option } = Select;
class Classify extends Component{
    constructor(props){
        super(props);
        this.state={
            classifyList:[],//大类列表
            visible:false,
            typeName:'',
        }
    }
    render(){
        let {classifyList} = this.state
        let { columns, data} = this.props
        return (
            <Fragment>
                <div className="supervise-container">
                    <div className="nav-container">分类管理列表</div>
                    <div className="supervise-list">
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
                                        <Option value='0'>全部</Option>
                                        {classifyList.map(d => (
                                            <Option key={d.typeId}>{d.typeName}<span style={{float:'right'}}><Icon type="edit" onClick={this.updateClassify.bind(this,d)}  style={{marginRight:5+'px'}}/><Icon type="minus-circle" /></span></Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item >
                                <Button  >查询</Button>
                                </Form.Item>
                            </Row>
                            </Form>
                        </div>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
                <Modal
                title="修改"
                visible={this.state.visible}
                onOk={this.hideModal}
                onCancel={this.hideModal}
                okText="确认"
                cancelText="取消"
                >
                <Input value={typeName}></Input>
                </Modal>
            </Fragment>
        )
    }
    componentWillMount(){
        this.getClassifyList()
    }
    getClassifyList(){
        getClassifyList()
        .then((res)=>{
            if(res.ok){
                this.setState({
                    classifyList:res.data
                })
            }
            console.log(res)
        })
    }
    // addItem
    updateClassify(d){
        this.setState({
            typeName:d.TypeName,
            typeId:d.typeId,
        })
    }
    hideModal = () => {
        this.setState({
          visible: false,
        });
    };
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
export default Classify;