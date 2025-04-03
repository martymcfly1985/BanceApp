import { Button, message, Popconfirm, Space, Table, Tooltip } from "antd"
import { useState } from "react";
import { deleteLeagueMember } from "../../../BusinessLogic/leagueActions";
import { ILeagueMember, LeagueRoleEnum } from "../../../Models/LeagueMember";
import { IUserLeagueData } from "../../../Models/UserLeagueData";
import { DeleteOutlined , EditOutlined} from '@ant-design/icons';
import { AlignType } from 'rc-table/lib/interface'
import MemberAddEdit, { MemberAddEditFormItems } from "./MemberAddEdit";

interface MembersListProps {
  loading: boolean,
  selectedLeague: IUserLeagueData,
  membersList: ILeagueMember[],
  onLeagueMemberAdded(newLeagueMember: ILeagueMember): void,
  onLeagueMemberDeleted(deletedLeagueMember: ILeagueMember) : void;
  onLeagueMemberEdited(editedLeagueMember: ILeagueMember) : void;
}

function MembersList({
  loading,
  selectedLeague,
  membersList,
  onLeagueMemberAdded,
  onLeagueMemberDeleted,
  onLeagueMemberEdited
} : MembersListProps) {
  const [memberTableModalVisible, setMemberTableModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [addedMember, setAddedMember] = useState(false);
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [selectedDeleteRecnum, setSelectedDeleteRecnum] = useState<number>();
  const [memberAddEditInitialValues, setMemberAddEditInitialValues] = useState<MemberAddEditFormItems | undefined>(undefined);
  const canEditMemberList = () => {return (selectedLeague?.leagueMember.role === 'Owner' || selectedLeague?.leagueMember.role === 'Moderator') && selectedLeague.league.recnum !== 0;}

  const onAddMemberClick = () => {
    setAddedMember(true);
    setMemberAddEditInitialValues({leagueRole: LeagueRoleEnum.Member})
    setMemberTableModalVisible(true);
    setModalTitle('Add a Member');
  }

  const onEditRow = (leagueMemberToEdit: ILeagueMember) => {
    setAddedMember(false);
    setMemberAddEditInitialValues({user: {value: leagueMemberToEdit.userRecnum, text: `${leagueMemberToEdit.firstName} ${leagueMemberToEdit.lastName}`}, leagueRole: leagueMemberToEdit.role, sub: leagueMemberToEdit.sub})
    setMemberTableModalVisible(true);
    setModalTitle('Edit a Member');
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
            <Button icon={<EditOutlined/>} onClick={() => {onEditRow(record)}}/>
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
      <MemberAddEdit
        title={modalTitle}
        open={memberTableModalVisible}
        leagueRecnum={selectedLeague!.league.recnum!}
        initialFormValues={memberAddEditInitialValues}
        onSuccess={(savedLeagueMember) => {
          if (addedMember) {
            onLeagueMemberAdded(savedLeagueMember);
          } else {
            onLeagueMemberEdited(savedLeagueMember)
          }
          setMemberTableModalVisible(false)
        }}
        onCancel={() => {
          setMemberTableModalVisible(false)
        }
        }
      />
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