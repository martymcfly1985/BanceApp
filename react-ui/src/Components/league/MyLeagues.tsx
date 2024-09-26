import { message, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { fetchUserLeagueData } from "../../BusinessLogic/leagueActions";
import { useUser } from "../../Hooks/useUser";
import "../../css/Shared.css";
import { IUserLeagueData } from "../../Models/UserLeagueData";
import { ILeague } from "../../Models/League";
import { ILeagueMember } from "../../Models/LeagueMember";


function MyLeagues() {
  const userInfo = useUser();
  const [leagueInformation, setLeagueInformation] = useState<IUserLeagueData[]>([]);
  const [leagueTableLoading, setLeagueTableLoading] = useState(true);
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

  return (
    <Content className="content">
      <Table
        loading={leagueTableLoading}
        pagination={false}
        dataSource={leagueInformation}
        columns={columns}
        bordered={true}
        rowKey={(record: IUserLeagueData) => String(record.league.recnum)}
      />
    </Content>
    
  )
}

export default MyLeagues