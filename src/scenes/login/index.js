import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser } from "../../actions/loginActions"
import { clearNotification } from "../../actions/notifierActions"
import { Form, Spin,notification, Icon, Input, Button, Checkbox, InputNumber } from 'antd'
const FormItem = Form.Item;

@connect((store) => {
  console.log(store);
  return {
    user: store.login.user,
    loading : store.login.fetching,
    notification : store.notifier.data
  };
})

class NormalLoginForm extends React.Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.user.logged){
      this.props.router.push("/");
    }
    if(nextProps.notification.type){
      this.Notify(nextProps.notification.type,
        nextProps.notification.title,
        nextProps.notification.message);
      this.props.dispatch(clearNotification())
    }
  }

  Notify = (type,message,desc) => {
    notification[type]({
      message: message,
      description: desc,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(loginUser(values));
        console.log('Received values of form: ', values);
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.loading);    
    return (
      <div>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Spin size="large" spinning={this.props.loading}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
        </Spin>
      </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
