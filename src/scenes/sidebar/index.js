import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router';
import logo from '../../images/new-logo.png';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Sidebar extends Component {

  render() {
    const { SubMenu } = Menu;
	  const { Header, Content, Sider } = Layout;
    return (
	    <div>
      <div className="logo">
        <img src={logo} />
      </div>
      <Menu mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span><Link to={"/projects"}>Projects</Link></span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          <span><Link to={"/issues"}>Issues</Link></span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          <span><Link to={"/userslog"}>Users</Link></span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="logout" />
          <span onClick={this.props.logout}>Logout</span>
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}

export default Sidebar;
