import { Button, Divider, Form, Input, Popconfirm, Rate, Select, Space, Switch } from "antd";
import { BulbFilled, CloseOutlined } from '@ant-design/icons';
import "../../css/Shared.css";
import { ICourt } from "../../Models/Court";

const { Option } = Select;

interface SubmitNewCourtFormFieldsProps {
  formRef: any;
  onFinish: any;
  formDisabled?: boolean;
  onFormChange?: any;
  onFinishFailed?: any;
  onClearForm: any;
  submitLoading?: boolean;
  validationStatus: "" | "success" | "warning" | "error" | "validating" | undefined;
  validationText: string | undefined;
  defaultFieldValues?: ICourt | undefined;
}

function SubmitNewCourtFormFields({
  formRef,
  onFinish,
  formDisabled=false,
  onFormChange,
  onFinishFailed,
  onClearForm,
  submitLoading=false,
  validationStatus,
  validationText,
  defaultFieldValues=undefined
}: SubmitNewCourtFormFieldsProps) {
  return (
    <Form
      layout={'vertical'}
      ref={formRef}
      name='courtForm'
      onFinish={onFinish}
      disabled={formDisabled}
      onValuesChange={onFormChange}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='name'
        label='Court Name'
        rules={[{ required: true, message: 'Please enter a court name.' }]}
        validateStatus={validationStatus}
				help={validationText}
        initialValue={
          defaultFieldValues === undefined ? undefined : defaultFieldValues.name
        }
      >
        <Input
          style={{ width: '20%' }}
          maxLength={50}
        />
      </Form.Item>
      <Form.Item name='lights' label='Court Lights'>
        <Switch
          checkedChildren={<BulbFilled />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={
            defaultFieldValues === undefined ? undefined : defaultFieldValues.lights
          }
        />
      </Form.Item>
      <Form.Item
        name='surface'
        label='Court Surface'
        rules={[{ required: true, message: 'Please select a surface type.' }]}
        initialValue={
          defaultFieldValues === undefined ? undefined : defaultFieldValues.surface
        }
      >
        <Select
          placeholder='Surface'
          style={{ width: '20%' }}
          options={[
            {value:'Clay', label:'Clay'},
            {value:'Grass', label:'Grass'},
            {value:'Hard', label:'Hard'}
          ]}
        />
      </Form.Item>
      <Form.Item
        name='condition'
        label='Court Condition'
      >
        <Rate
          disabled={formDisabled}
          allowClear={false}
          defaultValue={
            defaultFieldValues === undefined || defaultFieldValues.condition === null ?
            undefined :
            defaultFieldValues.condition
          }
        />
      </Form.Item>
      <Divider />
      <Form.Item>
        <Space size={'large'}>
          <Popconfirm
            title='All changes will be lost. Are you sure you want to clear the form?'
            onConfirm={onClearForm}
            okText='Yes'
            cancelText='No'
          >
            <Button htmlType="button">
              Reset
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitLoading}
          >
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default SubmitNewCourtFormFields
