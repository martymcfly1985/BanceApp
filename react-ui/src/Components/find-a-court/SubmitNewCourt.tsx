import React from "react";
import { fetchLocationData } from "../../BusinessLogic/courtActions";
import { ILocation } from "../../Models/Location";
import { Form, FormInstance, Input, message, Rate, Select, Switch } from "antd";
import { Content } from "antd/lib/layout/layout";
import { BulbFilled, CloseOutlined} from '@ant-design/icons';
import "../../css/Shared.css";

const { Option } = Select;

interface ISubmitNewCourtProps {}

interface ISubmitNewCourtState {
    locationData: ILocation[];
    loading: boolean;
    formDisabled: boolean;
}

class SubmitNewCourt extends React.Component<ISubmitNewCourtProps, ISubmitNewCourtState> {
  constructor(props: ISubmitNewCourtProps) {
    super(props);

    this.state = {
        locationData: [],
        loading: true,
        formDisabled: true,
    }
  }
  formRef = React.createRef<FormInstance>();

  onFinish = (values: any) => {
    console.log(values);
  };

  onLocationSelected = (values: any) => {
    if(values) {
      this.setState ({
        formDisabled: false
      });
    } else {
      this.setState ({
        formDisabled: true
      });
    } 
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
  }

  render() {
      return (
        <Content className="content">
          <Select 
            placeholder='Select Location' 
            style={{ width: '30%' }} 
            allowClear={true}
            loading={this.state.loading}
            disabled={this.state.loading}
            onChange={this.onLocationSelected}
          >
            {
              this.state.locationData.map((location: ILocation) => {
                return <Option value={location.name}>{location.name}</Option>
              })
            }
          </Select>

          <Form 
            layout={'horizontal'} 
            ref={this.formRef} 
            name='courtForm' 
            onFinish={this.onFinish} 
            disabled={this.state.formDisabled}
          >
            <Form.Item 
              name='courtName'
              label='Court Name' 
              rules={[{ required: true, message: 'Please enter a court name.'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item name='courtLights' label='Court Lights'>
              <Switch 
                checkedChildren={<BulbFilled/>} 
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
            <Form.Item
              name='courtSurface'
              label='Court Surface'
              rules={[{required: true, message: 'Please select a surface type.'}]}
            >
              <Select 
                placeholder='Surface'
              >
                <Option value='Clay'>Clay</Option>
                <Option value='Grass'>Grass</Option>
                <Option value='Hard'>Hard</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='courtCondition'
              label='Court Condition'
            >
              <Rate
                disabled={this.state.formDisabled}
              />
            </Form.Item>
          </Form>
        </Content>
      );
  }
}

export default SubmitNewCourt