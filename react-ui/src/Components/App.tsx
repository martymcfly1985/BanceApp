import { useState } from 'react';
import { Avatar, Button, Card, Layout, Menu, MenuProps, Space } from 'antd';
import '../css/App.css';
import FindACourt from './find-a-court/FindACourt';
import FindALeague from './find-a-league/FindALeague';
import SubmitNewCourt from './find-a-court/SubmitNewCourt';
import SubmitNewLocation from './find-a-court/SubmitNewLocation';
import { SolutionOutlined, ScheduleOutlined, LogoutOutlined } from '@ant-design/icons'
import { Divider } from 'rc-menu';

const { Header} = Layout;

function App() {
  const [currentMenuKey, setCurrentMenuKey] = useState('1');

  const menuClicked = async(event: any) => {
    setCurrentMenuKey(event.key);
  }

  const onSignOutClicked = () => {
    sessionStorage.clear();
    window.location.replace("/");
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
        label: <Avatar className='avatar-style' size={50} gap={8}>{`${sessionStorage.getItem("firstName")?.substring(0, 1)}${sessionStorage.getItem("lastName")?.substring(0, 1)}`}</Avatar>,
        key: 'Profile',
        children: [
          {
            label: 
              <Card style={{height: '100%', width: '100%' }}>
                <Space direction={'vertical'} size={'small'}>
                  <div> Welcome {sessionStorage.getItem("firstName")}! </div>
                  <Divider />
                  <Button type='text' icon={<SolutionOutlined/>}>
                    Your Profile
                  </Button>
                  <Button type='text' icon={<ScheduleOutlined/>}>
                    Your Leagues
                  </Button>
                  <Button type='text' onClick={onSignOutClicked} icon={<LogoutOutlined/>}>
                    Sign Out
                  </Button>
                </Space>
              </Card>,
            key: 'ProfileCard',
            style: {height:250, width:250, padding:0, backgroundColor: 'white'}
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
