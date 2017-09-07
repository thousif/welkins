import React, { Component } from 'react'
import moment from "moment"
import { Form, Input, Layout, Tooltip, Breadcrumb, Icon, DatePicker, Select, Row, Col, Checkbox, Button} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

class AddPromocodeForm extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      showPlugins : false,
      ifEditing : false,
      d_type : null,
      promo : {}
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.promo._id != nextProps.promo._id){
      console.log("initializePromo");
      this.initializePromo(nextProps)
    }
  }

  componentDidMount(){
    if(this.props.promo.code){
      this.initializePromo(this.props)
    }
  }

  initializePromo = (props) =>{    
    console.log(props);
    this.setState({
      promo : props.promo,
      ifEditing : true,
      showPlugins : (()=>{
        console.log(props.promo.type);
        if(props.promo.type == "Group_Plugin_Specific"){
          return true
        }
        return false
      })(),
    },()=>{
      console.log(this.state);
    })
    this.props.form.setFields({
      code : {
        value : props.promo.code
      },
      desc : {
        value : props.promo.desc
      },
      val  : {
        value : props.promo.value
      },
      typ  : {
        value : (()=>{
          if(props.promo.type == "Group_Plugin_Specific"){
            return "3"
          }
          return "2"
        })()
      },
      d_typ : {
        value : (()=>{
          if(props.promo.valuetype == "Net_Discount"){
            this.setState({d_type : 2});
            return "2"
          }
          this.setState({d_type : 1});
          return "1"
        })()
      },
      pl_id : {
        value : props.promo.plugin_id
      },
      exp : {
        value : moment(props.promo.expirydate)
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.callback(values);
      }
    });
  }

  checkPromoCode = (rule,value,callback) =>{
    if(value && value.toString().length == 11){
      callback()
    } else {
      callback("promo code must be 11 digits long.")
    }
  }

  checkDiscountAmount = (rule,value,callback) => {
    if(!value){
      return
    }

    console.log(value);
    console.log(this.state.d_type);

    if(this.state.d_type == 1 && value > 100){
      callback("Percentage amount can not be more than 100");
    }

    callback()

  }

  handleTypeChange = (e) => {
    console.log(e);
    if(e == 3){
      this.setState({
        showPlugins : true
      })
    }
    if(e == 2){
      this.setState({
        showPlugins : false
      }) 
    }
  }

  handleDiscountTypeChange = (e) => {
    if(e == 1){
      this.setState({d_type : 1});
    } 
    if(e == 2){
      this.setState({d_type : 2});
    }
  }

  render() {

    console.log(this.props);
    console.log(this.state);
    const { plugins } = this.props.data;
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

    var pluginsList = [];

    Object.keys(plugins).forEach(function (key) {
      let obj = plugins[key];
      pluginsList.push(<Option key={key} value={key}>{obj}</Option>);
    });

    console.log(pluginsList);

    return (
    	<div>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem 
            {...formItemLayout}
            label="Type of Promocode"
            >
              {getFieldDecorator('typ',{
                rules:[{required: true, message: 'Please select type of promocode'}]
              })(
                <Select onChange={this.handleTypeChange.bind(this)} name="typ" placeholder="Please select type">
                  <Option value="2">Group specific</Option>
                  <Option value="3">Group plugin specific</Option>
                </Select>
              )}
            </FormItem>
            {this.state.showPlugins && 
              <FormItem 
              {...formItemLayout}
              label="Select Plugin"
              >
                {getFieldDecorator('pl_id',{
                  rules:[{required: true, message: 'Please select a plugin'}]
                })(
                  <Select name="pl_id" placeholder="Please select a plugin">
                    {pluginsList}
                  </Select>
                )}
              </FormItem>
            }
            {!this.state.ifEditing && 
            <FormItem 
            {...formItemLayout}
            label="Module"
            >
              {getFieldDecorator('mod',{
                rules:[{required: true, message: 'Please select type of promocode'}]
              })(
                <Select placeholder="Please select type">
                  <Option value="1">video</Option>
                  <Option value="2">Quiz</Option>
                </Select>
              )}
            </FormItem>
            }
            <FormItem 
            {...formItemLayout}
            label="Promo Code"
            >
              {getFieldDecorator('code',{
                rules:[{required: true, message: 'Please input promo code'},{
                  validator : this.checkPromoCode
                }]
              })(
                <Input type="text" placeholder="ECK00XXXXXX" />
              )}
            </FormItem>
            <FormItem 
            {...formItemLayout}
            label="Description"
            >
              {getFieldDecorator('desc',{
                rules:[{required: true, message: 'please enter promocode description'}]
              })(
                <Input type="textarea" placeholder="promocode description" />
              )}
            </FormItem>
            <FormItem 
            {...formItemLayout}
            label="Type of Discount"
            >
              {getFieldDecorator('d_typ',{
                rules:[{required: true, message: 'Please select type of discount'}]
              })(
                <Select onChange={this.handleDiscountTypeChange.bind(this)} placeholder="Please select Discount type">
                  <Option value="1">Percentage Discount</Option>
                  <Option value="2">Net Discount</Option>
                </Select>
              )}
            </FormItem>
            <FormItem 
            {...formItemLayout}
            label="Discount Amount"
            >
              {getFieldDecorator('val',{
                rules:[{required: true, message: 'Please input discount amount'},{
                validator : this.checkDiscountAmount}]
              })(
                <Input type="number" placeholder="discount amount" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Expiry Date"
            >
              {getFieldDecorator('exp', 
                {rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                })(
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Select Time"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                loading={false}
              >
                Submit Promocode
              </Button>
            </FormItem>
          </Form>    
      </div>
    );
  }
}



const AddForm = Form.create()(AddPromocodeForm);

export default AddForm;
