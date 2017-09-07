import moment from 'moment';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPromo, fetchPromo, resetPromoState } from "../../actions/promoActions"
import AddForm from './components/addForm'
import { Form, Spin, Input, Layout, notification, Tooltip, Breadcrumb, Icon, DatePicker, Select, Row, Col, Checkbox, Button} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

@connect((store) => {
  console.log(store);
  return {
    promo: store.promo.data,
    loading : store.promo.loading
  };
})

class EditPromocodeForm extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      gcode : null,
      promoid : this.props.params.promoid,
    }
  }

  componentWillMount(){
    if(!this.props.promo.code){
      this.props.dispatch(fetchPromo(this.state.promoid))
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.promo.success){
      this.props.dispatch(resetPromoState())
      this.props.router.push("/promocode");
    }
  }

  Notify = (type,message,desc) => {
    notification[type]({
      message: message,
      description: desc,
    });
  };

  submitPromoCode = (data) =>{
    console.log("submitting promo code");
    console.log(data);
    data.promo_id = this.state.promoid;
    data.exp = moment(data.exp).format('x');
    console.log(data);
    this.props.dispatch(editPromo(data));
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

    const promo = this.props.promo.promos.find((promo)=>{
      if(promo._id == this.state.promoid){
        return promo
      }
    }) || this.props.promo.currentPromo;

    return (
    	<div>
        <Breadcrumb style={{ margin: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Promocode</Breadcrumb.Item>
          <Breadcrumb.Item>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <Spin size="large" spinning={this.props.loading}>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
          <h3>Edit Promocode</h3>
            <AddForm promo={promo} data={this.props.promo} callback={this.submitPromoCode} />
        </Content>
        </Spin>
        </div>
    );
  }
}

const EditPromocode = Form.create()(EditPromocodeForm);

export default EditPromocode;
