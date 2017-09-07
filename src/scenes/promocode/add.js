import moment from 'moment';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGroupDetails, createPromo, resetPromoState } from "../../actions/promoActions"
import AddForm from './components/addForm'
import { Form, Input, Spin, Layout, Tooltip, Breadcrumb, Icon, DatePicker, Select, Row, Col, Checkbox, Button} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

@connect((store) => {
  console.log(store);
  return {
    promo: store.promo.data,
    loading : store.promo.loading
  };
})

class AddPromocodeForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      gcode : null
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.promo.success){
      this.props.dispatch(resetPromoState())
      this.props.router.push("/promocode");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(getGroupDetails(values)); 
      }
    });
  }

  handleChange = (e) => {
    console.log(e.target);
    if(e.target.name == "gcode"){
      this.setState({
        gcode : e.target.value
      })
    }
  }

  checkGroupCode = (rule,value,callback) =>{
    if(value.toString().length == 6){
      callback()
    } else {
      callback("Group code must be 6 digits long.")
    }
  }

  submitPromoCode = (data) =>{
    console.log("submitting promo code");
    console.log(data);
    data.g_id = this.props.promo.group._id;
    data.exp = moment(data.exp).format('x')
    this.props.dispatch(createPromo(data));
  }
  
  render() {
    console.log(this.props);

	  const { Content } = Layout;
    const { getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 10 },
      },
    };
    // Only show error after a field is touched.
    return (
    	<div>
        <Breadcrumb style={{ margin: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Promocode</Breadcrumb.Item>
          <Breadcrumb.Item>Add</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
          <Spin size="large" spinning={this.props.loading}>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem
              label="Group Code"
            >
              {getFieldDecorator('gcode', {
                rules: [{ required: true, message: 'Please input group code!' },{
                  validator : this.checkGroupCode
                }],
              })(
                <Input type="number" name="gcode" prefix={<Icon type="usergroup-add" style={{ fontSize: 13 }} />} onChange={this.handleChange} placeholder="6 digit code" />
              )} 
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                loading={false}
              >
                Get Details
              </Button>
            </FormItem>
          </Form>
          <hr className="myhr" />
          {this.props.promo.ready &&
            <div>
            <h3 style={{margin:"20px 0"}}>Create Promocode for {this.props.promo.group.name}</h3>
            <AddForm promo={{}} data={this.props.promo} callback={this.submitPromoCode} />
            </div>
          }
          </Spin>
        </Content>
        </div>
    );
  }
}



const AddPromocode = Form.create()(AddPromocodeForm);

export default AddPromocode;
