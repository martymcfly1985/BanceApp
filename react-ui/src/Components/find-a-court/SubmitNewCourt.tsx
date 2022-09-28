import React from "react";
import { fetchLocationData } from "../../BusinessLogic/courtActions";
import { ILocation } from "../../Models/Location";
import { message, Select } from "antd";
import { Content } from "antd/lib/layout/layout";

const { Option } = Select;

interface ISubmitNewCourtProps {}

interface ISubmitNewCourtState {
    locationData: ILocation[];
    loading: boolean;
}

class SubmitNewCourt extends React.Component<ISubmitNewCourtProps, ISubmitNewCourtState> {
  constructor(props: ISubmitNewCourtProps) {
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

  render() {
      return (
        <Content style={{ padding: '50px', height: '92vh' }}>
            <Select defaultValue = 'Select Location' style={{ width: '30%' }}>
                {
                    this.state.locationData.map((location: any) => {
                        return <Option value={location.Name}>{location.Name}</Option>
                    })
                }
            </Select>
        </Content>
      );
  }
}

export default SubmitNewCourt