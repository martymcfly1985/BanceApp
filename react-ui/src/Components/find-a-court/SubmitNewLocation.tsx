import React from "react";
import { fetchLocationData, saveNewCourt } from "../../BusinessLogic/courtActions";
import { ILocation } from "../../Models/Location";
import { Button, Divider, Drawer, Form, FormInstance, Input, message, Popconfirm, Rate, Select, Space, Switch, Table, TimePicker, Tooltip } from "antd";
import { Content } from "antd/lib/layout/layout";
import { BulbFilled, CloseOutlined } from '@ant-design/icons';
import "../../css/Shared.css";
import { ICourt } from "../../Models/Court";
import SubmitNewCourtFormFields from "./SubmitNewCourtFormFields";

const { Option } = Select;

interface ISubmitNewLocationProps { }

interface ISubmitNewLocationState {
	formDisabled: boolean;
	submitLoading: boolean;
	drawerOpen: boolean;
	courtList: ICourt[];
	courtTableVisible: boolean;
}

class SubmitNewLocation extends React.Component<ISubmitNewLocationProps, ISubmitNewLocationState> {
	constructor(props: ISubmitNewLocationProps) {
		super(props);

		this.state = {
			formDisabled: true,
			submitLoading: false,
			drawerOpen: false,
			courtList: [],
			courtTableVisible: false
		}
	}
	formRef = React.createRef<FormInstance>();

	onCourtFinish = (values: any) => {
		const newCourt: ICourt = {
			name: values.courtName,
			lights: values.courtLights,
			surface: values.courtSurface,
			condition: values.courtCondition,
		}
		this.setState({
			courtList: [...this.state.courtList, newCourt],
			drawerOpen: false,
			courtTableVisible: true
		})
		this.formRef.current!.resetFields();
		console.log(this.state);
	};

	onLocationFinish = () => {

	}

	onClearForm = () => {
		this.formRef.current!.resetFields();
	};

	onAddCourtClick = () => {
		this.setState({
			drawerOpen: true
		})
	}

	render() {
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
				render: (lights: boolean) => String(lights).charAt(0).toUpperCase() + String(lights).slice(1)
			},
			{
				title: 'Condition',
				dataIndex: 'condition',
				key: 'condition',
				width: '20%',
				render: (condition: number | null) => {
					if (condition === null) {
						return "No Rating";
					}
					return <Rate disabled defaultValue={condition} />;
				}
			}
		];
		return (
			<>
				<Content className="content">
					<Space direction="vertical" style={{ display: 'flex' }} split={<Divider />}>
						<Form
							layout={'vertical'}
							ref={this.formRef}
							name='locationForm'
							onFinish={this.onLocationFinish}
						>
							<Form.Item
								name='locationName'
								label='Location Name'
								rules={[{ required: true, message: 'Please enter a location name.' }]}
							>
								<Input
									style={{ width: '20%' }}
									maxLength={50}
								/>
							</Form.Item>
							<Form.Item
								name='locationAddress'
								label='Location Address'
								rules={[{ required: true, message: 'Please enter a location address.' }]}
							>
								<Input
									style={{ width: '20%' }}
									maxLength={50}
								/>
							</Form.Item>
							<Form.Item
								name='locationHours'
								label='Location Hours'
								rules={[{ required: true, message: 'Please enter location hours.' }]}
							>
								<TimePicker.RangePicker
									style={{ width: '20%' }}
									use12Hours
									format="h:mm a"
									minuteStep={15}
									allowClear
								/>
							</Form.Item>
							<Divider />
							<Button
								htmlType="button"
								onClick={this.onAddCourtClick}
							>
								Add a Court
							</Button>
							<Divider />
							{
								this.state.courtTableVisible ? 
								<><Table
									pagination={false}
									columns={columns}
									dataSource={this.state.courtList}
									size={'small'}
									bordered={true}
									rowKey={(record: ICourt) => String(record.recnum)}
								/>
								<Divider /> 
								</> : undefined
							}
							<Button
								htmlType="button"
							>
								Submit Location
							</Button>
						</Form>
					</Space>
				</Content>
				<Drawer
					title="Add a court to your location."
					width={'50%'}
					open={this.state.drawerOpen}
					closable={false}
				>
					<SubmitNewCourtFormFields
						formRef={this.formRef}
						onFinish={this.onCourtFinish}
						onClearForm={this.onClearForm}
					/>
				</Drawer>

			</>
		);
	}
}

export default SubmitNewLocation