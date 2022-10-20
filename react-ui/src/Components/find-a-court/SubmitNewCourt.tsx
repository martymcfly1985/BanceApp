import React from "react";
import { fetchLocationData } from "../../BusinessLogic/courtActions";
import { ILocation } from "../../Models/Location";
import { Button, Divider, Form, FormInstance, Input, message, Popconfirm, Rate, Select, Space, Switch, Tooltip } from "antd";
import { Content } from "antd/lib/layout/layout";
import { BulbFilled, CloseOutlined} from '@ant-design/icons';
import "../../css/Shared.css";

const { Option } = Select;

interface ISubmitNewCourtProps {}

interface ISubmitNewCourtState {
    locationData: ILocation[];
    loading: boolean;
    formDisabled: boolean;
    selectDisabled: boolean;
}

class SubmitNewCourt extends React.Component<ISubmitNewCourtProps, ISubmitNewCourtState> {
  constructor(props: ISubmitNewCourtProps) {
    super(props);

    this.state = {
        locationData: [],
        loading: true,
        formDisabled: true,
        selectDisabled: false
    }
  }
  formRef = React.createRef<FormInstance>();

  onFinish = (values: any) => {
    console.log(values);
  };

  onFormChange = () => {
    this.setState ({
      selectDisabled: true
    })
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
                    return <Option value={location.name}>{location.name}</Option>
                  })
                }
              </Select>
            </Tooltip>
            <Form 
              layout={'vertical'} 
              ref={this.formRef} 
              name='courtForm' 
              onFinish={this.onFinish} 
              disabled={this.state.formDisabled}
              onValuesChange={this.onFormChange}
            >
              <Form.Item 
                name='courtName'
                label='Court Name' 
                rules={[{ required: true, message: 'Please enter a court name.'}]}
              >
                <Input 
                  style={{width:'20%'}}
                  maxLength={50}
                />
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
                  style={{width:'20%'}}
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
              <Divider/>
              <Form.Item>
                <Space size={'large'}>
                  <Popconfirm
                    title='All changes will be lost. Are you sure you want to clear the form?'
                    onConfirm={this.onClearForm}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button htmlType="button">
                      Clear
                    </Button>
                  </Popconfirm>
                    <Button>
                      Submit
                    </Button>
                  </Space>
              </Form.Item>
            </Form>
          </Space>
        </Content>
      );
  }
}

export default SubmitNewCourt