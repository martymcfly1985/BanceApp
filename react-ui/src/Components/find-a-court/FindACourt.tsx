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
        dataIndex: 'name',
        key: 'courtName',
        width: '40%'
      },
      {
        title: 'Surface',
        dataIndex: 'surface',
        key: 'surface',
        width: '20%'
      },
      {
        title: 'Lights',
        dataIndex: 'lights',
        key: 'lights',
        width: '20%',
        render : (lights: boolean) => String(lights).charAt(0).toUpperCase() + String(lights).slice(1)
      },
      {
        title: 'Condition',
        dataIndex: 'condition',
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
        rowKey={(record: ICourt) => String(record.recnum)}
      />
    );
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
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
            expandedRowRender: (record: ILocation) => {
              return this.expandedRowRender(record.courts);}
          }}
          loading={this.state.loading}
          rowKey={(record: ILocation) => String(record.recnum)}
          bordered={true}
          rowClassName={() => 'location'}
        />
      </Content>
    );
  }
}

export default FindACourt;