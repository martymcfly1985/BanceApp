import { message, Rate, Table, Input} from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { fetchLocationData } from "../../BusinessLogic/courtActions";
import { ICourt } from "../../Models/Court";
import { ILocation } from "../../Models/Location";
import "../../css/Shared.css";
import CourtInformation from "./CourtInformation";

const { Search } = Input;

interface IFindACourtProps {}

interface IFindACourtState {
  locationData: ILocation[];
  filteredLocationData: ILocation[];
  loading: boolean;
  drawerOpen: boolean;
  selectedCourt: ICourt;
}

class FindACourt extends React.Component<IFindACourtProps, IFindACourtState> {
  constructor(props: IFindACourtProps) {
    super(props);

    this.state = {
      locationData: [],
      filteredLocationData: [],
      loading: true,
      drawerOpen: false,
      selectedCourt: {
        name: '',
        lights: true,
        condition: 0,
        surface: '',
      }
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

  onCourtRowSelection = (clickedCourt: any) => {
    this.setState ({
      drawerOpen: true,
      selectedCourt: clickedCourt
    })
  }

  onDrawerClose = () => {
    this.setState ({
      drawerOpen: false
    })
  }

  updateCourtCondition = (newCondition: number, courtRecnum: number, locationRecnum: number) => {
    const locationData = this.state.locationData.map((location) => {
      if (location.recnum !== locationRecnum) {
        return location;
      } else {
        const courtList = location.courts.map((court) => {
          if (court.recnum !== courtRecnum) {
            return court;
          } else {
            const newCourt: ICourt = {
              name: court.name,
              lights: court.lights,
              surface: court.surface,
              condition: newCondition,
              recnum: courtRecnum,
              locationRecnum: locationRecnum
            }
            this.setState ({
              selectedCourt: newCourt
            })
            return newCourt;
          }
        })
        const newLocation: ILocation = {
          name: location.name,
          address: location.address,
          hours: location.hours,
          courts: courtList,
          recnum: location.recnum
        }
        return newLocation;
      }
    })
    this.setState ({
      filteredLocationData: locationData
    })
  }

  expandedRowRender = (courts: ICourt[]) => {
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
        onFilter: (value: any, record: ICourt) => {
          if (value === "No Rating") {
            return record.condition === null;
          }
          return record.condition === value
        },
        render : (condition: number | null) => {
          if (condition === null) {
            return "No Rating";
          }
          return <Rate disabled value={condition} />;
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
        onRow={(record) => {
          return {
            onClick: () => {this.onCourtRowSelection(record)}
          };
        }}
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
      <>
        <Content className="content">
          <Table
            title={() => <Search placeholder="Search" onChange={this.onLocationSearch} allowClear/>}
            pagination={false}
            dataSource={this.state.filteredLocationData} 
            columns={this.columns} 
            expandable={{
              expandedRowRender: (record: ILocation) => {
                return this.expandedRowRender(record.courts);
              }
            }}
            loading={this.state.loading}
            rowKey={(record: ILocation) => String(record.recnum)}
            bordered={true}
          />
        </Content>
        <CourtInformation
          selectedCourt={this.state.selectedCourt}
          drawerOpen={this.state.drawerOpen}
          onDrawerClose={this.onDrawerClose}
          updateCourtCondition={this.updateCourtCondition}
        />
      </>
    );
  }
}

export default FindACourt;