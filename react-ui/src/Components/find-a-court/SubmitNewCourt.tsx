import React from "react";
import { fetchLocationData, saveNewCourt } from "../../BusinessLogic/courtActions";
import { ILocation } from "../../Models/Location";
import { Divider, FormInstance, message, Select, Space, Tooltip } from "antd";
import { Content } from "antd/lib/layout/layout";
import "../../css/Shared.css";
import { ICourt } from "../../Models/Court";
import SubmitNewCourtFormFields from "./SubmitNewCourtFormFields";
import { courtNameIsUnique } from "../../BusinessLogic/sharedCourtFunctionality";

const { Option } = Select;

interface ISubmitNewCourtProps {}

interface ISubmitNewCourtState {
  locationData: ILocation[];
  loading: boolean;
  formDisabled: boolean;
  selectDisabled: boolean;
  selectedLocationRecnum: number;
  submitLoading: boolean;
  validationStatus: "" | "success" | "warning" | "error" | "validating" | undefined;
  validationText: string | undefined;
}

class SubmitNewCourt extends React.Component<ISubmitNewCourtProps, ISubmitNewCourtState> {
  constructor(props: ISubmitNewCourtProps) {
    super(props);

    this.state = {
      locationData: [],
      loading: true,
      formDisabled: true,
      selectDisabled: false,
      selectedLocationRecnum: 0,
      submitLoading: false,
      validationStatus: undefined,
      validationText: undefined
    }
  }
  formRef = React.createRef<FormInstance>();

  onFinish =  async (values: any) => {
    const newCourt: ICourt = {
      name: values.name,
      lights: values.lights,
      surface: values.surface,
      condition: values.condition,
      locationRecnum: this.state.selectedLocationRecnum
    }
    try {
      this.setState ({
        submitLoading: true
      })
      if(this.courtNameIsUnique(newCourt.name)) {
        await saveNewCourt(newCourt); 
        this.formRef.current!.resetFields();
        message.success('The new court has been added!');
        this.setState ({
          submitLoading: false,
          selectDisabled: false,
          validationStatus: undefined,
          validationText: undefined
        })
      } else{
				this.setState ({
					validationStatus: "error",
					validationText: "Please enter a unique court name.",
					submitLoading: false
				})
			}
    } catch {
      message.error('Unable to submit new court.');
      this.setState ({
        submitLoading: false
      })
    }
  };

  courtNameIsUnique = (newCourtName: string) => {
    const currentLocation = this.state.locationData.find((location) => {
      return location.recnum === this.state.selectedLocationRecnum;
    });
    if(currentLocation === undefined)
    {
      throw Error;
    }
    return courtNameIsUnique(newCourtName, currentLocation.courts);
  };

  onFormChange = () => {
    this.setState ({
      selectDisabled: true
    })
  };

  onLocationSelected = (value: any) => {
    if(value) {
      this.setState ({
        formDisabled: false,
        selectedLocationRecnum: value
      });
    } else {
      this.setState ({
        formDisabled: true,
        selectedLocationRecnum: 0
      });
    } 
    this.formRef.current!.resetFields();
  };

  onClearForm = () => {
    this.formRef.current!.resetFields();
    this.setState ({
      selectDisabled: false
    })
  };

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
  };

  render() {
      return (
        <Content className="content">
          <Space direction="vertical" style={{display:'flex'}} split={<Divider/>}>
            <Tooltip 
              title={this.state.selectDisabled ? 'Please clear the form to select a new location.' : undefined}
              placement='rightBottom'
            > 
              <Select 
                placeholder='Select Location' 
                style={{ width: '20%' }} 
                allowClear={true}
                loading={this.state.loading}
                disabled={this.state.loading || this.state.selectDisabled}
                onChange={this.onLocationSelected}
              >
                {
                  this.state.locationData.map((location: ILocation) => {
                    return <Option value={location.recnum}>{location.name}</Option>
                  })
                }
              </Select>
            </Tooltip>
            <SubmitNewCourtFormFields
              formRef={this.formRef}
              onFinish={this.onFinish}
              formDisabled={this.state.formDisabled}
              onFormChange={this.onFormChange}
              onClearForm={this.onClearForm}
              submitLoading={this.state.submitLoading}
              validationStatus={this.state.validationStatus}
              validationText={this.state.validationText}
            />
          </Space>
        </Content>
      );
  }
}

export default SubmitNewCourt