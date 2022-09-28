import { message, Rate, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { fetchLocationData } from "../../BusinessLogic/courtActions";
import { ICourt } from "../../Models/Court";
import { ILocation } from "../../Models/Location";
import "../../css/FindACourt.css";

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

  expandedRowRender = (courts: ICourt[]) => 
  {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'Name',
        key: 'courtName',
        width: '40%'
      },
      {
        title: 'Surface',
        dataIndex: 'Surface',
        key: 'surface',
        width: '20%'
      },
      {
        title: 'Lights',
        dataIndex: 'Lights',
        key: 'lights',
        width: '20%',
        render : (lights: boolean) => String(lights).charAt(0).toUpperCase() + String(lights).slice(1)
      },
      {
        title: 'Condition',
        dataIndex: 'Condition',
        key: 'condition',
        width: '20%',
        render : (condition: number | null) => 
        {
          if(condition === null)
          {
            return "No Rating";
          }
          return <Rate disabled defaultValue={condition} />;
        }
      }
    ];
    return (
      <Table
        pagination={false}
        columns={columns}
        dataSource={courts}
        size={'small'}
        bordered={true}
        rowClassName={'location'}
      />
    );
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'address',
    },
    {
      title: 'Hours',
      dataIndex: 'Hours',
      key: 'hours',
    }
  ];


  render() {
    return (
      <Content style={{ padding: '50px', height: '92vh' }}>
        <Table
          pagination={false}
          dataSource={this.state.locationData} 
          columns={this.columns} 
          expandable={{
            expandedRowRender: (record: any) => {
              return this.expandedRowRender(record.Courts);}
          }}
          loading={this.state.loading}
          rowKey={(record: any) => String(record.Recnum)}
          bordered={true}
          rowClassName={() => 'location'}
        />
      </Content>
    );
  }
}

export default FindACourt;