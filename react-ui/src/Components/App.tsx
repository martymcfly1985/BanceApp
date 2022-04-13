import React, { useState } from 'react';
import { Button, Layout, Menu, Tabs } from 'antd';
import '../css/App.css';
import FindACourt from './find-a-court/FindACourt';
import FindALeague from './find-a-league/FindALeague';
import { fetchCourtData } from '../BusinessLogic/courtActions';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

function App() {
  const [currentMenuKey, setcurrentMenuKey] = useState('1');

  const menuClicked = async(event: any) => {
    setcurrentMenuKey(event.key);
    await fetchCourtData();
  }

  const componentsSwtich = (currentMenuKey: string) => {
    switch (currentMenuKey) {
      case '1':
        return (<FindACourt/>);
      case '2':
        return (<FindALeague/>);
      default:
        break;
     }
  };

  return (
    <Layout className='header'>
      <Header>
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" selectedKeys={[currentMenuKey]} onClick={menuClicked}>
          <Menu.Item key={'1'}>Find a Court</Menu.Item>
          <Menu.Item key={'2'}>Find a League</Menu.Item>
        </Menu>
      </Header>
      {componentsSwtich(currentMenuKey)}   
    </Layout>
  );
}

export default App;
