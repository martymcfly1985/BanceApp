import { useState } from 'react';
import { Avatar, Button, Card, Divider, Layout, Menu, MenuProps, Popover, Space } from 'antd';
import '../css/App.css';
import FindACourt from './find-a-court/FindACourt';
import FindALeague from './find-a-league/FindALeague';
import SubmitNewCourt from './find-a-court/SubmitNewCourt';
import SubmitNewLocation from './find-a-court/SubmitNewLocation';
import { SolutionOutlined, ScheduleOutlined, LogoutOutlined } from '@ant-design/icons'
import { useUser } from '../Hooks/useUser';
import Profile from './profile/Profile';

const { Header} = Layout;

function App() {
  const [currentMenuKey, setCurrentMenuKey] = useState('1');
  const userInfo = useUser()

  const menuClicked = (event: any) => {
    if (event.key !== 'Profile') {
      setCurrentMenuKey(event.key);
    }
  }

  const onProfileButtonClick = () => {
    setCurrentMenuKey('ProfilePage')
  }

  const onSignOutClicked = () => {
    localStorage.clear();
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
    if (userInfo === null) {
      items.push({
        label: (
          <a href="/signin">
            Sign In
          </a>
        ),
        key: 'SignIn',
        style: {float: 'right'}
      })
    } else {
      items.push({
        label: 
          <Popover
            placement='bottom'
            trigger='click'
            showArrow={false}
            content={
              <Card style={{width: 300}}>
                Welcome {userInfo.firstName}!
                <Divider />
                <Space direction={'vertical'} size={'small'}>
                  <Button onClick={onProfileButtonClick} type='text' icon={<SolutionOutlined/>}>
                    Your Profile
                  </Button>
                  <Button type='text' icon={<ScheduleOutlined/>}>
                    Your Leagues
                  </Button>
                  <Button type='text' onClick={onSignOutClicked} icon={<LogoutOutlined/>}>
                    Sign Out
                  </Button>
                </Space>
              </Card>
            }
          >
            <Avatar
              className='avatar-style'
              size={50} gap={8}
            >
              {`${userInfo.firstName.substring(0, 1)}${userInfo.lastName.substring(0, 1)}`}
            </Avatar>
          </Popover>,
        key: 'Profile',
        style: {float: 'right'}
      })
    }
    return items;
  };

  const componentsSwitch = (currentMenuKey: string) => {
    switch (currentMenuKey) {
      case 'ViewLocations':
        return (<FindACourt/>);
      case 'SubmitNewLocation':
        return (<SubmitNewLocation/>);
      case 'SubmitNewCourt':
        return (<SubmitNewCourt/>);
      case 'FindALeague':
        return (<FindALeague/>);
      case 'ProfilePage':
        return (<Profile/>);
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
      {componentsSwitch(currentMenuKey)}   
    </Layout>
  );
}

export default App;
