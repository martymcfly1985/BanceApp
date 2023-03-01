import { useState } from 'react';
import { Avatar, Button, Card, Col, Layout, Menu, MenuProps, Row } from 'antd';
import '../css/App.css';
import FindACourt from './find-a-court/FindACourt';
import FindALeague from './find-a-league/FindALeague';
import SubmitNewCourt from './find-a-court/SubmitNewCourt';
import SubmitNewLocation from './find-a-court/SubmitNewLocation';
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
        label: sessionStorage.getItem("username"),
        key: 'Profile',
        children: [
          {
            label: 
              <Card style={{justifyContent:'left', height:'100%', width:'100%'}}>
                <Col>
                  <Row>
                    <Avatar style={{marginBottom:6}} size={48} gap={8}>USER</Avatar>
                  </Row>
                  <Divider/>
                  <Row>
                    <Button type='text'>
                      Profile
                    </Button>
                  </Row>
                  <Row>
                    <Button type='text'>
                      Your Leagues
                    </Button>
                  </Row>
                  <Row>
                    <Button type='text' onClick={onSignOutClicked}>
                      Sign Out
                    </Button>
                  </Row>
                </Col>
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
