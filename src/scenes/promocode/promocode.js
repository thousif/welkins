import React, { Component } from 'react'
import { Form, Input, Spin, Layout, Tooltip, Collapse, Breadcrumb,Menu, Icon, DatePicker, Select, Row, Col, Checkbox, Button} from 'antd'
import { IndexLink, Link } from "react-router"
import { connect } from 'react-redux'
import { listPromos } from "../../actions/promoActions"
import moment from "moment"
const FormItem = Form.Item;
const Panel = Collapse.Panel;

@connect((store) => {
  console.log(store);
  return {
    promo: store.promo.data,
    lp_loading : store.promo.lp_loading,
  };
})

class PromocodeClass extends Component {

  add = () => {
    console.log(this.props);
    this.props.router.push("/promocode/add");
  }

  constructor(props){
    super(props);
    this.state = {
      gcode : null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(listPromos(values)); 
      }
    });
  }

  checkGroupCode = (rule,value,callback) =>{
    if(value.toString().length == 6){
      callback()
    } else {
      callback("Group code must be 6 digits long.")
    }
  }

  render() {
    const { SubMenu } = Menu;
	  const { Header, Content, Sider } = Layout;
    const { getFieldDecorator} = this.props.form;

    console.log(this.props);

    const promos = this.props.promo.promos.map((promo,id) =>{
      return <Panel header={promo.code} key={id}>
        <div>
        <p>{promo.desc}</p>  
        <p>Status : <bold>{promo.status}</bold></p>
        <p>Discount : {promo.value}{
          (promo.valuetype == "Net_Discount") ? "INR" : "%"
        }</p>
        <p>Expires on {moment(promo.expirydate).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <Link to={'/promocode/edit/'+promo._id}>Edit</Link>
        </div>
        
      </Panel>
    })

    return (
    	<div>
        <Breadcrumb style={{ margin: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Promocode</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem
              label="Group Code"
            >
              {getFieldDecorator('gcode', {
                rules: [{ required: true, message: 'Please input group code!' },{
                  validator : this.checkGroupCode
                }],
              })(
                <Input type="number" name="code" prefix={<Icon type="usergroup-add" style={{ fontSize: 13 }} />} onChange={this.handleChange} placeholder="6 digit code" />
              )} 
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                loading={false}
              >
                Get Promocodes
              </Button>
            </FormItem>
          </Form>
          <hr className="myhr" />
          <Button type="dashed" onClick={this.add} style={{ width: '60%',margin : '0 20%' }}>
            <Icon type="plus" /> Add Promocode
          </Button>
          <div className="promos">
          <Spin size="large" spinning={this.props.lp_loading}> 
          <Collapse bordered={false} >
            {promos}
          </Collapse>
          </Spin>
          </div>
        </Content>
        </div>
    );
  }
}

const Promocode = Form.create()(PromocodeClass)

export default Promocode;
