import { AutoComplete, Button, Collapse, CollapseProps, Drawer, Form, Input, message, Modal, Select, SelectProps, Space, Switch, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { fetchMembersList, fetchUserLeagueData, updateLeague } from "../../BusinessLogic/leagueActions";
import { useUser } from "../../Hooks/useUser";
import { DeleteOutlined , EditOutlined} from '@ant-design/icons';
import "../../css/Shared.css";
import { IUserLeagueData } from "../../Models/UserLeagueData";
import { ILeague } from "../../Models/League";
import { ILeagueMember } from "../../Models/LeagueMember";
import { AlignType } from 'rc-table/lib/interface'
import { fetchUsersByName } from "../../BusinessLogic/userActions";

function MyLeagues() {
  const userInfo = useUser();
  const [leagueInformation, setLeagueInformation] = useState<IUserLeagueData[]>([]);
  const [membersList, setMembersList] = useState<ILeagueMember[]>([]);
  const [leagueTableLoading, setLeagueTableLoading] = useState(true);
  const [memberTableLoading, setMemberTableLoading] = useState(false);
  const [memberTableModalVisible, setMemberTableModalVisible] = useState(false);
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();
  const [selectedLeague, setSelectedLeague] = useState<IUserLeagueData>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const canEditLeague = () => {return selectedLeague?.leagueMember.role === 'Owner';}
  const canEditMemberList = () => {return selectedLeague?.leagueMember.role === 'Owner' || selectedLeague?.leagueMember.role === 'Moderator';}
  let timeout: ReturnType<typeof setTimeout> | null;
  let currentValue: string;

  useEffect(() => {
    async function fetch() {
      try {
        setLeagueTableLoading(true);
        setLeagueInformation(await fetchUserLeagueData(userInfo!.recnum!));
        setLeagueTableLoading(false);
      } catch {
        message.error("Unable to obtain league information.");
        setLeagueTableLoading(false);
      }
    }
    if (userInfo) {
      fetch();
    }
  }, [userInfo]);

  const onAddMemberClick = () => {
    setMemberTableModalVisible(true);
  }


const fetch = (value: string, callback: (data: { value: number; text: string }[]) => void) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake = async () => {
    await fetchUsersByName(value)
      .then((d) => {
        if (currentValue === value) {
          const data = d.map((item) => ({
            value: item.recnum!,
            text: `${item.firstName} ${item.lastName}`,
          }));
          callback(data);
        }
      });
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

const handleSearch = (newValue: string) => {
  fetch(newValue, setData);
};

const handleChange = (newValue: string) => {
  setValue(newValue);
};

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

  const memberColumns = [
    {
      title:'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '25%'
    },
    {
      title:'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '25%'
    },
    {
      title:'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%'
    },
    {
      title:'League Role',
      dataIndex: 'role',
      key: 'role',
      width: '10%'
    },
    {
      title:'Sub',
      dataIndex: 'sub',
      key: 'sub',
      width: '10%',
      render : (sub: boolean) => sub === true ? "Yes" : "No"
    }
  ]

  const memberColumnsWithActions = [
    ...memberColumns,
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as AlignType,
      width: '10%',
      render: (record: any) => {
        return (
          <Space hidden={!canEditMemberList()} size='small'>
            <Button icon={<EditOutlined/>} /*onClick={() => {onEditRow(record)}}*//>
            <Button icon={<DeleteOutlined/>} /*onClick={() => {onDeleteRow(record.name)}}*//>
          </Space>
        )
      }
    }
  ]

  const items: CollapseProps['items'] = [
    {
      label: 'League Information',
      key: 'information',
      children: (
        <Form
          id='LeagueForm'
          initialValues={{ name: selectedLeague?.league.name, public: selectedLeague?.league.public, joinable: selectedLeague?.league.joinable, playtime: selectedLeague?.league.playtime, city: selectedLeague?.league.city, state: selectedLeague?.league.state }}
          layout={'vertical'}
          disabled={!canEditLeague()}
          onFinish={async (values: ILeague) => {
              try {
                  const updatedLeague: ILeague = {
                    ...values,
                    recnum: selectedLeague?.league.recnum
                  }
                  await updateLeague(updatedLeague);
                  message.success('League information updated successfully!');  
                  const updatedLeagueInformation = leagueInformation.map((league) => {
                    if (league.league.recnum === updatedLeague?.recnum) {
                      return {
                        ...league,
                        league: updatedLeague
                      }
                    }
                    return league
                  }
                )
                setLeagueInformation(updatedLeagueInformation);
              } catch {
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
            hidden={!canEditLeague()}
          >
            Save Changes
          </Button>
        </Form>
      )
    },
    {
      label: 'Members List',
      key: 'members',
      children: (
      <>
          <Button
            style={{marginBottom:'20px'}}
            type='primary'
            onClick={() => {
              onAddMemberClick()
            }}
          >
            Add a Member
          </Button>
          <Modal
            open={memberTableModalVisible}
          >
            <Form>
              <Form.Item>
                <Select
                  showSearch
                  value={value}
                  placeholder={'Whatever'}
                  defaultActiveFirstOption={false}
                  suffixIcon={null}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  notFoundContent={null}
                  options={(data || []).map((d) => ({
                    value: d.value,
                    label: d.text,
                  }))}
                />
              </Form.Item>
            </Form>
          </Modal>
          <Table
            loading={memberTableLoading}
            pagination={false}
            dataSource={membersList}
            columns={canEditMemberList() ? memberColumnsWithActions : memberColumns}
            bordered={true}
          />
        </>
      )
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
              onClick: async () => {
                setSelectedLeague(record);
                setDrawerOpen(true);
                try {
                  setMemberTableLoading(true);
                  setMembersList(await fetchMembersList(record.league.recnum!));
                  setMemberTableLoading(false);
                } catch {
                  message.error("Unable to obtain members list.")
                  setMemberTableLoading(false);
                }
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