import React, { useState } from 'react';
import {Layout, Menu} from 'antd';
import '../css/App.css';
import FindACourt from './find-a-court/FindACourt';
import FindALeague from './find-a-league/FindALeague';
import SubmitNewCourt from './find-a-court/SubmitNewCourt';

const { Header} = Layout;

function App() {
  const [currentMenuKey, setcurrentMenuKey] = useState('1');

  const menuClicked = async(event: any) => {
    setcurrentMenuKey(event.key);
  }

  const componentsSwtich = (currentMenuKey: string) => {
    switch (currentMenuKey) {
      case 'ViewLocations':
        return (<FindACourt/>);
      case 'SubmitNewLocation':
        return (<div>Submit New Location - Under Construction</div>);
      case 'SubmitNewCourt':
        return (<SubmitNewCourt/>);
      case 'FindALeague':
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
          <Menu.SubMenu key={'FindACourt'} title="Find a Court">
            <Menu.Item key={'ViewLocations'}>View Locations</Menu.Item>
            <Menu.Item key={'SubmitNewLocation'}>Submit New Location</Menu.Item>
            <Menu.Item key={'SubmitNewCourt'}>Submit New Court</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={'FindALeague'}>Find a League</Menu.Item>
        </Menu>
      </Header>
      {componentsSwtich(currentMenuKey)}   
    </Layout>
  );
}

export default App;
