import { message, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { fetchLocationData } from "../../BusinessLogic/courtActions";
import { ILocation } from "../../Models/Location";

interface IFindACourtProps {}

interface IFindACourtState {
  locationData: ILocation[];
  loading: boolean;
}

class FindACourt extends React.Component<IFindACourtProps, IFindACourtState> {
  constructor(props: IFindACourtProps) {
    super(props);

    this.state = {
      locationData: [],
      loading: true
    }
  }
  

  async componentDidMount() {
    let locations: ILocation[] = [];
    try {
      locations = await fetchLocationData();
    } catch {
      message.error('Unable to retrieve location data. Please try again.');
    } 
    this.setState ({
      locationData: locations,
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
          dataSource={this.state.locationData} 
          columns={this.columns} 
          loading={this.state.loading}
          rowKey={record => String(record.recnum)}
        />
      </Content>
    );
  }
}

export default FindACourt;