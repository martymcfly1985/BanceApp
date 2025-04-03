import { Button, Collapse, CollapseProps, Drawer, message, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { fetchMembersList, fetchUserLeagueData } from "../../../BusinessLogic/leagueActions";
import { useUser } from "../../../Hooks/useUser";
import { PlusOutlined } from "@ant-design/icons";
import "../../../css/Shared.css";
import { IUserLeagueData } from "../../../Models/UserLeagueData";
import { ILeague } from "../../../Models/League";
import { ILeagueMember, LeagueRoleEnum } from "../../../Models/LeagueMember";
import LeagueAddEditForm from "./LeagueAddEditForm";
import MembersList from "./MembersList";

function MyLeagues() {
  const userInfo = useUser();
  const [leagueInformation, setLeagueInformation] = useState<IUserLeagueData[]>([]);
  const [membersList, setMembersList] = useState<ILeagueMember[]>([]);
  const [leagueTableLoading, setLeagueTableLoading] = useState(true);
  const [memberTableLoading, setMemberTableLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<IUserLeagueData>();
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const onCreateLeagueButtonClick = () => {
    const initialLeagueValues = {
      league: {
        recnum: 0,
        name: '',
        public: false,
        joinable: false,
        city: '',
        state: '',
        playtime: ''
      },
      leagueMember: {
        recnum: 0,
        leagueRecnum: 0,
        userRecnum: userInfo?.recnum,
        role: LeagueRoleEnum.Owner,
        sub: false,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email
      }
    } as IUserLeagueData;
    setMembersList([initialLeagueValues.leagueMember])
    setSelectedLeague(initialLeagueValues);
    setDrawerOpen(true);
  }

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
        <LeagueAddEditForm
          selectedLeague = {selectedLeague!}
          onSuccessfulLeagueInsert={(insertedLeague) => {
            setLeagueInformation([...leagueInformation, insertedLeague]);
            setSelectedLeague(insertedLeague);
          }}
          onSuccessfulLeagueUpdate={(updatedLeague) => {
            const updatedLeagueInformation = leagueInformation.map((league) => {
              if (league.league.recnum === updatedLeague?.recnum) {
                return {
                  ...league,
                  league: updatedLeague
                }
              }
              return league;
            });
            setLeagueInformation(updatedLeagueInformation);
          }}
        />
      )
    },
    {
      label: 'Members List',
      key: 'members',
      children: (
        <MembersList
          loading={memberTableLoading}
          selectedLeague={selectedLeague!}
          membersList={membersList}
          onLeagueMemberAdded={(newLeagueMember) => {
            setMembersList([...membersList, newLeagueMember]);
          }}
          onLeagueMemberDeleted={(deletedLeagueMember) => {
            setMembersList(membersList.filter((leagueMember) => leagueMember.userRecnum !== deletedLeagueMember.userRecnum))
          }}
          onLeagueMemberEdited={(editedLeagueMember) => {
            setMembersList(membersList.map((member) => {
              if (member.userRecnum === editedLeagueMember.userRecnum) {
                return editedLeagueMember;
              } else {
                return member;
              }
            }))
          }}
        />
      )
    }
  ]

  return (
    <>
      <Content className="content">
        <Button 
          style={{marginBottom:'10px'}} 
          icon={<PlusOutlined />} 
          type="primary"
          onClick={() => {
            onCreateLeagueButtonClick();
          }}
        >
          Create a League
        </Button>
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