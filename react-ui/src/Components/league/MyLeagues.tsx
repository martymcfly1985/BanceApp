import { Button, Collapse, CollapseProps, Drawer, Form, Input, message, Switch, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { fetchUserLeagueData, updateLeague } from "../../BusinessLogic/leagueActions";
import { useUser } from "../../Hooks/useUser";
import "../../css/Shared.css";
import { IUserLeagueData } from "../../Models/UserLeagueData";
import { ILeague } from "../../Models/League";
import { ILeagueMember } from "../../Models/LeagueMember";

function MyLeagues() {
  const userInfo = useUser();
  const [leagueInformation, setLeagueInformation] = useState<IUserLeagueData[]>([]);
  const [leagueTableLoading, setLeagueTableLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<IUserLeagueData>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const readOnly = () => {return selectedLeague?.leagueMember.role !== 'Owner';}
  useEffect(() => {
    async function fetch() {
      try {
        setLeagueTableLoading(true);
        setLeagueInformation(await fetchUserLeagueData(userInfo!.recnum!));
      } catch {
        message.error("Unable to obtain league information.");
      }
      setLeagueTableLoading(false);
    }
    if (userInfo) {
      fetch();
    }
  }, [userInfo]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'league',
      render: (item: ILeague) => item.name,
      key: 'name',
    },
    {
      title: 'Play Time',
      dataIndex: 'league',
      render: (item: ILeague) => item.playtime,
      key: 'playtime',
    },
    {
      title: 'City',
      dataIndex: 'league',
      render: (item: ILeague) => item.city,
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'league',
      render: (item: ILeague) => item.state,
      key: 'state',
    },
    {
      title: 'Role',
      dataIndex: 'leagueMember',
      render: (item: ILeagueMember) => item.role,
      key: 'role',
    }
  ];

  const items: CollapseProps['items'] = [
    {
      label: 'League Information',
      key: 'information',
      children: (
        <Form
          id='LeagueForm'
          initialValues={{ name: selectedLeague?.league.name, public: selectedLeague?.league.public, joinable: selectedLeague?.league.joinable, playtime: selectedLeague?.league.playtime, city: selectedLeague?.league.city, state: selectedLeague?.league.state }}
          layout={'vertical'}
          disabled={readOnly()}
          onFinish={async (values: ILeague) => {
              try {
                const updatedLeague: ILeague = {
                  ...values,
                  recnum: selectedLeague?.league.recnum
                }
                await updateLeague(updatedLeague);
                message.success('League information updated successfully!');            }
              catch {
                message.error('Unable to update league information. Please try again later.');
              }
            }
          }
        >
          <Form.Item 
            label={'League Name:'}
            name={'name'}
            rules={[
              { required: true, message: 'Please enter a league name.' },
              { whitespace: true, message: 'Please enter a league name.' }
            ]}
          >
            <Input
              placeholder='League Name'
            />
          </Form.Item>
          <Form.Item 
            label={'Public:'}
            name={'public'}
          >
            <Switch
              checkedChildren='Yes' unCheckedChildren='No'
            />
          </Form.Item>
          <Form.Item 
            label={'Joinable:'}
            name={'joinable'}
          >
            <Switch
              checkedChildren='Yes' unCheckedChildren='No'
            />
          </Form.Item>
          <Form.Item 
            label={'City:'}
            name={'city'}
            rules={[
              { required: true, message: 'Please enter a city.' },
              { whitespace: true, message: 'Please enter a city.' }
            ]}
          >
            <Input
              placeholder='City'
            />
          </Form.Item>
          <Form.Item 
            label={'State:'}
            name={'state'}
            rules={[
              { required: true, message: 'Please enter a state.' },
              { whitespace: true, message: 'Please enter a state.' }
            ]}
          >
            <Input
              placeholder='State'
            />
          </Form.Item>
          <Form.Item 
            label={'Playtime:'}
            name={'playtime'}
            rules={[
              { required: true, message: 'Please enter a playtime description.' },
              { whitespace: true, message: 'Please enter a playtime description.' }
            ]}
          >
            <Input
              placeholder='Playtime'
            />
          </Form.Item>
          <Button
            form='LeagueForm'
            type='primary'
            htmlType='submit'
            hidden={readOnly()}
          >
            Save Changes
          </Button>
        </Form>
      )
    },
    {
      label: 'Members List',
      key: 'members'
    }
  ]

  return (
    <>
      <Content className="content">
        <Table
          loading={leagueTableLoading}
          pagination={false}
          dataSource={leagueInformation}
          columns={columns}
          bordered={true}
          rowKey={(record: IUserLeagueData) => String(record.league.recnum)}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedLeague(record);
                setDrawerOpen(true);
              }
            };
          }}
        />
      </Content>
      <Drawer 
        maskClosable={false}
        destroyOnClose
        width={'70%'} 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Collapse defaultActiveKey={['information']} ghost items={items} />
      </Drawer>
    </>
  )
}

export default MyLeagues