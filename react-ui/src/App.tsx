import React from 'react';
import { Button, Layout, Menu, Tabs } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;


function App() {
  return (
      <Layout className='header'>
          <Header>
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key={1}>Find a Court</Menu.Item>
              <Menu.Item key={2}>Find a League</Menu.Item>
            </Menu>
          </Header>

          <Content style={{ padding: '50px' }}>
             <div className="site-layout-content">Content</div>
            
          </Content>
      </Layout>
      );
}

export default App;
