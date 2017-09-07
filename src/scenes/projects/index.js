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

  constructor(props){
    super(props);
    this.state = {}
  }


  render() {
    const { SubMenu } = Menu;
	  const { Header, Content, Sider } = Layout;
    const { getFieldDecorator} = this.props.form;

    console.log(this.props);

    return (
    	<div>
        <Breadcrumb style={{ margin: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Projects</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
          <Spin size="large" spinning={this.props.lp_loading}> 
          </Spin>
        </Content>
      </div>
    );
  }
}

const Projects = Form.create()(PromocodeClass)

export default Projects;