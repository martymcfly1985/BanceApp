import { Button, Divider, Form, Input, Popconfirm, Rate, Select, Space, Switch } from "antd";
import { BulbFilled, CloseOutlined } from '@ant-design/icons';
import "../../css/Shared.css";

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
  validationText
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
        name='courtName'
        label='Court Name'
        rules={[{ required: true, message: 'Please enter a court name.' }]}
        validateStatus={validationStatus}
				help={validationText}
      >
        <Input
          style={{ width: '20%' }}
          maxLength={50}
        />
      </Form.Item>
      <Form.Item name='courtLights' label='Court Lights'>
        <Switch
          checkedChildren={<BulbFilled />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
      <Form.Item
        name='courtSurface'
        label='Court Surface'
        rules={[{ required: true, message: 'Please select a surface type.' }]}
      >
        <Select
          placeholder='Surface'
          style={{ width: '20%' }}
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
          disabled={formDisabled}
          allowClear={false}
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
              Clear
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
