import { Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { fetchUserLeagueData } from "../../BusinessLogic/leagueActions";
import { useUser } from "../../Hooks/useUser";
import { ILeague } from "../../Models/League";
import "../../css/Shared.css";


function MyLeagues() {
  const userInfo = useUser();
  const [leagueInformation, setLeagueInformation] = useState<ILeague[]>([])
  useEffect(() => {
    async function fetch() {
      setLeagueInformation(await fetchUserLeagueData(userInfo!.recnum!))
    }
    if(userInfo) {
      fetch()
    }
  }, [userInfo]) 

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Play Time',
      dataIndex: 'playtime',
      key: 'playtime',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    }
  ];

  return(
    <Content className="content">
      <Table
        pagination={false}
        dataSource={leagueInformation}
        columns={columns}
        bordered={true}
        rowKey={(record: ILeague) => String(record.recnum)}
      />
    </Content>
    
  )
}

export default MyLeagues