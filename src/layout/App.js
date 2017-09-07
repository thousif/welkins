import React, { Component } from 'react'
import { Button } from 'antd'
import './App.css'
import Header from '../scenes/header/index'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import Sidebar from '../scenes/sidebar/index'
import Projects from '../scenes/projects'
import Promocode from '../scenes/promocode/promocode'
import { clearNotification } from "../actions/notifierActions"
import { logout } from '../actions/loginActions'
import { Layout, Menu, Icon, notification } from 'antd'
const { Sider, Content } = Layout;
const cookies = new Cookies();

@connect((store) => {
  console.log(store);
  return {
    user : store.login.user,
    notification : store.notifier.data
  };
})

class App extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    if(this.props.user.logout){
      // this.props.router.push("/login");
    }
  }

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout = () => {
    console.log("logging out user");
    this.props.dispatch(logout())
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.logout){
      // this.props.router.push("/login");
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

  render() {
    return (
        <div >
      	<Layout style={{minHeight : '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
    	  <Sidebar logout = {this.logout} />	
        </Sider>
        <Layout>
          <Header />
          {this.props.children}
        </Layout>
      </Layout>
      </div>
    );
  }
}

export default App;
