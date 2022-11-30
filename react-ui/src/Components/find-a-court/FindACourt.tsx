import { message, Rate, Table , Input} from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { fetchLocationData } from "../../BusinessLogic/courtActions";
import { ICourt } from "../../Models/Court";
import { ILocation } from "../../Models/Location";
import "../../css/Shared.css";

const { Search } = Input;

interface IFindACourtProps {}

interface IFindACourtState {
  locationData: ILocation[];
  filteredLocationData: ILocation[];
  loading: boolean;
}

class FindACourt extends React.Component<IFindACourtProps, IFindACourtState> {
  constructor(props: IFindACourtProps) {
    super(props);

    this.state = {
      locationData: [],
      filteredLocationData: [],
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
      filteredLocationData: locations,
      locationData: locations,
      loading: false
    });
  }

  onLocationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const filteredLocations = this.state.locationData.filter((location) => {
      return location.name.toUpperCase().includes(inputValue.toUpperCase()) || location.address.toUpperCase().includes(inputValue.toUpperCase())
    });
    this.setState ({
      filteredLocationData: filteredLocations
    })
  }

  onLocationSearchClear = () => {

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
        width: '20%',
        filters: [
					{
						text: 'Clay',
        		value: 'Clay',
					},
					{
						text: 'Grass',
       	 		value: 'Grass',
					},
					{
						text: 'Hard',
						value: 'Hard',
					}
				],
				onFilter: (value: any, record: ICourt) => record.surface === value,
      },
      {
        title: 'Lights',
        dataIndex: 'lights',
        key: 'lights',
        width: '20%',
        filters: [
					{
						text: 'Yes',
        		value: true,
					},
          {
						text: 'No',
        		value: false,
					}
        ],
        onFilter: (value: any, record: ICourt) => record.lights === value,
        render : (lights: boolean) => lights === true ? "Yes" : "No"
      },
      {
        title: 'Condition',
        dataIndex: 'condition',
        key: 'condition',
        width: '20%',
        filters: [
          {
						text: "No Rating",
        		value: "No Rating",
					},
					{
						text: <Rate disabled defaultValue={1}/>,
        		value: 1,
					},
          {
						text: <Rate disabled defaultValue={2}/>,
        		value: 2,
					},
          {
						text: <Rate disabled defaultValue={3}/>,
        		value: 3,
					},
          {
						text: <Rate disabled defaultValue={4}/>,
        		value: 4,
					},
          {
						text: <Rate disabled defaultValue={5}/>,
        		value: 5,
					}
        ],
        onFilter: (value: any, record: ICourt) => 
        {
          if(value === "No Rating")
          {
            return record.condition === null;
          }
          return record.condition === value
        },
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
      <Content className="content">
        <Table
          title={() => <Search placeholder="Search" onChange={this.onLocationSearch} allowClear/>}
          pagination={false}
          dataSource={this.state.filteredLocationData} 
          columns={this.columns} 
          expandable={{
            expandedRowRender: (record: ILocation) => {
              return this.expandedRowRender(record.courts);}
          }}
          loading={this.state.loading}
          rowKey={(record: ILocation) => String(record.recnum)}
          bordered={true}
        />
      </Content>
    );
  }
}

export default FindACourt;