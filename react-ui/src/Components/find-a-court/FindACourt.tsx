import { message, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { fetchCourtData } from "../../BusinessLogic/courtActions";
import { ICourt } from "../../Models/Court";

interface IFindACourtProps {}

interface IFindACourtState {
  courtData: ICourt[];
  loading: boolean;
}

class FindACourt extends React.Component<IFindACourtProps, IFindACourtState> {
  constructor(props: IFindACourtProps) {
    super(props);

    this.state = {
      courtData: [],
      loading: true
    }
  }
  

  async componentDidMount() {
    let court: ICourt[] = [];
    try {
      court = await fetchCourtData();
    } catch {
      message.error('Unable to retrieve court data. Please try again.');
    } 
    this.setState ({
      courtData: court,
      loading: false
    });
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Surface',
      dataIndex: 'Surface',
      key: 'surface',
    },
    {
      title: 'Lights',
      dataIndex: 'Lights',
      key: 'lights',
      render : (lights: boolean) => String(lights).charAt(0).toUpperCase() + String(lights).slice(1)
    },
    {
      title: 'Condition',
      dataIndex: 'Condition',
      key: 'condition',
    }
  ];


  render() {
    return (
      <Content style={{ padding: '50px', height: '92vh' }}>
        <Table 
          dataSource={this.state.courtData} 
          columns={this.columns} 
          loading={this.state.loading}
          rowKey={record => String(record.recnum)}
        />
      </Content>
    );
  }
}

export default FindACourt;