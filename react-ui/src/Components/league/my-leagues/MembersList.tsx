import { Button, Form, message, Modal, Popconfirm, Select, SelectProps, Space, Switch, Table, Tooltip } from "antd"
import { useState } from "react";
import { addNewLeagueMember, deleteLeagueMember } from "../../../BusinessLogic/leagueActions";
import { ILeagueMember, LeagueRoleEnum } from "../../../Models/LeagueMember";
import { IUserLeagueData } from "../../../Models/UserLeagueData";
import { searchUsersNotInLeague } from "../../../BusinessLogic/userActions";
import { DeleteOutlined , EditOutlined} from '@ant-design/icons';
import { AlignType } from 'rc-table/lib/interface'
const { Option } = Select;

interface MembersListProps {
  loading: boolean,
  selectedLeague: IUserLeagueData,
  membersList: ILeagueMember[],
  onNewLeagueMemberAdded(newLeagueMember: ILeagueMember): void,
  onLeagueMemberDeleted(deletedLeagueMember: ILeagueMember) : void;
}

function MembersList({
  loading,
  selectedLeague,
  membersList,
  onNewLeagueMemberAdded,
  onLeagueMemberDeleted
} : MembersListProps) {
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [memberTableModalVisible, setMemberTableModalVisible] = useState(false);
  const [matchingUsers, setMatchingUsers] = useState<SelectProps['options']>([]);
  const [selectedUserRecnum, setSelectedUserRecnum] = useState<string>();
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [selectedDeleteRecnum, setSelectedDeleteRecnum] = useState<number>();
  const canEditMemberList = () => {return selectedLeague?.leagueMember.role === 'Owner' || selectedLeague?.leagueMember.role === 'Moderator';}
  let timeout: ReturnType<typeof setTimeout> | null;
  let currentValue: string;

  const onSubmit = async (values: any) => {
    try {
      setSubmitButtonLoading(true);
      const newLeagueMember = await addNewLeagueMember(selectedLeague!.league.recnum!, Number(selectedUserRecnum), values.leagueRole, values.sub);
      setSubmitButtonLoading(false);
      setMemberTableModalVisible(false);
      onNewLeagueMemberAdded(newLeagueMember);
      setMatchingUsers([])
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

  const onAddMemberClick = () => {
    setMemberTableModalVisible(true);
  }

  const onDeleteRow = async (userToDelete: ILeagueMember) => {
    if (userToDelete.role !== LeagueRoleEnum.Owner) {
      try {
        setDeleteButtonLoading(true);
        await deleteLeagueMember(userToDelete.leagueRecnum, userToDelete.userRecnum);
        message.success('The league member has been deleted.');
        onLeagueMemberDeleted(userToDelete);
        setDeleteButtonLoading(false);
      } catch {
        message.error("Unable to delete league member. Please try again.");
        setDeleteButtonLoading(false);
      }
    } else {
      message.error('A league owner cannot be deleted. Please change their role first.')
    }
  }

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
      render: (record: ILeagueMember) => {
        return (
          <Space size='small'>
            <Button icon={<EditOutlined/>} /*onClick={() => {onEditRow(record)}}*//>
            <Popconfirm
              title='Delete Member'
              description='Are you sure you would like to delete this member?'
              onConfirm={() => {onDeleteRow(record)}}
            >
              <Button onClick={() => {
                setSelectedDeleteRecnum(record.recnum)
              }} disabled={deleteButtonLoading && record.recnum === selectedDeleteRecnum} loading={deleteButtonLoading && record.recnum === selectedDeleteRecnum} icon={<DeleteOutlined/>}/> 
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  return (
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
        loading={loading}
        pagination={false}
        dataSource={membersList}
        columns={canEditMemberList() ? memberColumnsWithActions : memberColumns}
        bordered={true}
      />
    </>
  )
}

export default MembersList