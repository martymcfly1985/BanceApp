import { Button, Collapse, CollapseProps, Drawer, Form, Input, message, Modal, Select, SelectProps, Space, Switch, Table, Tooltip } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { addNewLeagueMember, fetchMembersList, fetchUserLeagueData, updateLeague } from "../../BusinessLogic/leagueActions";
import { useUser } from "../../Hooks/useUser";
import { DeleteOutlined , EditOutlined} from '@ant-design/icons';
import "../../css/Shared.css";
import { IUserLeagueData } from "../../Models/UserLeagueData";
import { ILeague } from "../../Models/League";
import { ILeagueMember, LeagueRoleEnum } from "../../Models/LeagueMember";
import { AlignType } from 'rc-table/lib/interface'
import { searchUsersNotInLeague } from "../../BusinessLogic/userActions";
const { Option } = Select;

function MyLeagues() {
  const userInfo = useUser();
  const [leagueInformation, setLeagueInformation] = useState<IUserLeagueData[]>([]);
  const [membersList, setMembersList] = useState<ILeagueMember[]>([]);
  const [leagueTableLoading, setLeagueTableLoading] = useState(true);
  const [memberTableLoading, setMemberTableLoading] = useState(false);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [memberTableModalVisible, setMemberTableModalVisible] = useState(false);
  const [matchingUsers, setMatchingUsers] = useState<SelectProps['options']>([]);
  const [selectedUserRecnum, setSelectedUserRecnum] = useState<string>();
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

  const onSubmit = async (values: any) => {
    try {
      setSubmitButtonLoading(true);
      const newLeagueMember = await addNewLeagueMember(selectedLeague!.league.recnum!, Number(selectedUserRecnum), values.leagueRole, values.sub);
      setMembersList([...membersList, newLeagueMember]);
      setSubmitButtonLoading(false);
      setMemberTableModalVisible(false);
    } catch {
      message.error("Unable to add new league member.");
      setSubmitButtonLoading(false);
    }
  }

const fetch = (searchString: string, callback: (data: { value: number; text: string }[]) => void) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = searchString;

  const search = async () => {
    await searchUsersNotInLeague(searchString, selectedLeague!.league.recnum!)
      .then((userSearchResults) => {
        if (currentValue === searchString) {
          const data = userSearchResults.map((user) => ({
            value: user.recnum!,
            text: `${user.firstName} ${user.lastName}`,
          }));

          callback(data);
        }
      });
  };
  if (searchString) {
    timeout = setTimeout(search, 300);
  } else {
    callback([]);
  }
};

const handleSearch = (newValue: string) => {
  fetch(newValue, setMatchingUsers);
};

const handleChange = (newValue: string) => {
  setSelectedUserRecnum(newValue);
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
          <Space size='small'>
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
          <Tooltip
            title={!canEditMemberList() ? 'You must be a moderator or owner to add members.' : undefined}
          >
            <Button
              style={{marginBottom:'20px'}}
              disabled={!canEditMemberList()}
              type='primary'
              onClick={() => {
                onAddMemberClick()
              }}
            >
              Add a Member
            </Button>
          </Tooltip>
          <Modal
            open={memberTableModalVisible}
            onCancel={() => {
              setMemberTableModalVisible(false)
              setSelectedUserRecnum(undefined)
              setMatchingUsers([])
            }}
            centered
            title='Add a Member'
            closeIcon={false}
            maskClosable={false}
            okButtonProps={{
              loading: submitButtonLoading,
              form: 'AddMemberForm',
              htmlType: 'submit'
            }}
            destroyOnClose
          >
            <Form
              layout='vertical'
              id='AddMemberForm'
              initialValues={{leagueRole: LeagueRoleEnum.Member}}
              onFinish={(values) => {
                onSubmit(values)
              }}
            >
              <Form.Item
                label={'User:'}
                name={'user'}
                id='user'
                required={true}
                rules={[
                  { required: true, message: 'Please select a user.' }
                ]}
              >
                <Select
                  showSearch
                  value={selectedUserRecnum}
                  placeholder={'Search for users by name, email, or username.'}
                  defaultActiveFirstOption={false}
                  suffixIcon={null}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  notFoundContent={null}
                >
                  {(matchingUsers || []).map((d, index) => {
                    return (
                      <Option
                        value={d.value}
                        key={index}
                      >
                        {d.text}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label={'League Role:'}
                name={'leagueRole'}
                id='leagueRole'
              >
                <Select
                  //defaultValue={LeagueRoleEnum.Member}
                  options={
                    Object.values(LeagueRoleEnum).map((leagueRole) => {
                      return ({
                        value: leagueRole,
                        label: leagueRole
                      });
                    })}
                />
              </Form.Item>
              <Form.Item
                label={'Is this player a sub?:'}
                name={'sub'}
                id='sub'
              >
                <Switch
                  checkedChildren={'Yes'}
                  unCheckedChildren={'No'}
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