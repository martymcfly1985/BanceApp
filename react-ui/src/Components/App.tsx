import { useState } from 'react';
import {Layout, Menu, MenuProps} from 'antd';
import '../css/App.css';
import FindACourt from './find-a-court/FindACourt';
import FindALeague from './find-a-league/FindALeague';
import SubmitNewCourt from './find-a-court/SubmitNewCourt';
import SubmitNewLocation from './find-a-court/SubmitNewLocation';

const { Header} = Layout;

function App() {
  const [currentMenuKey, setCurrentMenuKey] = useState('1');

  const menuClicked = async(event: any) => {
    setCurrentMenuKey(event.key);
  }

  const getMenuItems = () => {
    const items: MenuProps['items'] = [
      {
        label: 'Find a Court',
        key: 'FindACourt',
        children: [
          {
            label: 'View Locations',
            key: 'ViewLocations'
          },
          {
            label: 'Submit New Location',
            key: 'SubmitNewLocation'
          },
          {
            label: 'Submit New Court',
            key: 'SubmitNewCourt'
          }
        ]
      },
      {
        label: 'Find a League',
        key: 'FindALeague' 
      }
    ]
    if (sessionStorage.getItem("username") === null) {
      items.push({
        label: (
          <a href="signin">
            Sign In
          </a>
        ),
        key: 'SignIn',
        style: {float: 'right'}
      })
    } else {
      items.push({
        label: sessionStorage.getItem("username"),
        key: 'Profile',
        children: [
          {
            label: 'Profile',
            key: 'Profile'
          },
          {
            label: 'Your Leagues',
            key: 'YourLeagues'
          },
          {
            label: 'Sign Out',
            key: 'SignOut'
          },
        ],
        style: {float: 'right'}
      })
    }
    return items;
  };

  const componentsSwtich = (currentMenuKey: string) => {
    switch (currentMenuKey) {
      case 'ViewLocations':
        return (<FindACourt/>);
      case 'SubmitNewLocation':
        return (<SubmitNewLocation/>);
      case 'SubmitNewCourt':
        return (<SubmitNewCourt/>);
      case 'FindALeague':
        return (<FindALeague/>);
      default:
        break;
     }
  };

  return (
    <Layout className='layout'>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div className="logo"/>
        <Menu style={{ display: 'block' }} theme="dark" mode="horizontal" triggerSubMenuAction='click' selectedKeys={[currentMenuKey]} onClick={menuClicked} items={getMenuItems()}/>  
      </Header>
      {componentsSwtich(currentMenuKey)}   
    </Layout>
  );
}

export default App;
