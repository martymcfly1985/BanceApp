import React from "react";
import { ILocation } from "../../Models/Location";
import { Button, Divider, Drawer, Form, FormInstance, Input, message, Popconfirm, Rate, Space, Table, TimePicker } from "antd";
import { Content } from "antd/lib/layout/layout";
import "../../css/Shared.css";
import { ICourt } from "../../Models/Court";
import SubmitNewCourtFormFields from "./SubmitNewCourtFormFields";
import { saveNewLocation } from "../../BusinessLogic/locationActions";
import { courtNameIsUnique } from "../../BusinessLogic/sharedCourtFunctionality";

interface ISubmitNewLocationProps { }

interface ISubmitNewLocationState {
	formDisabled: boolean;
	submitLoading: boolean;
	drawerOpen: boolean;
	courtList: ICourt[];
	locationValidationStatus: "" | "success" | "warning" | "error" | "validating" | undefined;
	locationValidationText: string | undefined;
	courtValidationStatus: "" | "success" | "warning" | "error" | "validating" | undefined;
	courtValidationText: string | undefined;
}

class SubmitNewLocation extends React.Component<ISubmitNewLocationProps, ISubmitNewLocationState> {
	constructor(props: ISubmitNewLocationProps) {
		super(props);

		this.state = {
			formDisabled: true,
			submitLoading: false,
			drawerOpen: false,
			courtList: [],
			locationValidationStatus: undefined,
			locationValidationText: undefined,
			courtValidationStatus: undefined,
			courtValidationText: undefined
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
		if(courtNameIsUnique(newCourt.name,this.state.courtList)){
			this.setState({
				courtList: [...this.state.courtList, newCourt],
				drawerOpen: false,
				courtValidationStatus: undefined,
				courtValidationText: undefined
			})
			this.formRef.current!.resetFields();
		} else{
			this.setState ({
				courtValidationStatus: "error",
				courtValidationText: "Please enter a unique court name."
			})
		}
	};

	onLocationFinish = async (values: any) => {
		const newLocation: ILocation = {
			name: values.locationName,
			address: values.locationAddress,
			hours: `${values.locationHours[0].format('hh:mm A')}-${values.locationHours[1].format('hh:mm A')}`,
			courts: this.state.courtList
		}
		try {
      this.setState ({
        submitLoading: true
      })
      const result = await saveNewLocation(newLocation); 
      if(result===true)
			{
				this.formRef.current!.resetFields();
				message.success('The new location has been added!');
				this.setState ({
					submitLoading: false,
					courtList: []
				})
			} else{
				this.setState ({
					locationValidationStatus: "error",
					locationValidationText: "Please enter a unique location name.",
					submitLoading: false
				})
			}
    } catch {
      message.error('Unable to submit new location.');
      this.setState ({
        submitLoading: false
      })
    }
	}

	onDrawerCancel = () => {
		this.setState({
			drawerOpen: false
		})
	}

	onLocationNameChange = () => {
		this.setState ({
			locationValidationStatus: undefined,
			locationValidationText: undefined
		})
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
								validateStatus={this.state.locationValidationStatus}
								help={this.state.locationValidationText}
							>
								<Input
									style={{ width: '20%' }}
									maxLength={50}
									onChange={this.onLocationNameChange}
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
								this.state.courtList.length !== 0 ?
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
								htmlType="submit"
								loading={this.state.submitLoading}
								disabled={this.state.courtList.length === 0}
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
					destroyOnClose={true}
					extra={
						<Space>
							<Popconfirm
								title='All changes will be lost. Are you sure you want to clear the form?'
								okText='Yes'
								cancelText='No'
								onConfirm={this.onDrawerCancel}
							>
								<Button>Cancel</Button>
							</Popconfirm>
						</Space>
					}
				>
					<SubmitNewCourtFormFields
						formRef={this.formRef}
						onFinish={this.onCourtFinish}
						onClearForm={this.onClearForm}
						validationStatus={this.state.courtValidationStatus}
          	validationText={this.state.courtValidationText}
					/>
				</Drawer>
			</>
		);
	}
}

export default SubmitNewLocation