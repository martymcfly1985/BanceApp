import React from 'react';
import { Button, Layout, Menu, Tabs } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;


function App() {
  return (

    <Tabs type="card">
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
  
}

export default App;
