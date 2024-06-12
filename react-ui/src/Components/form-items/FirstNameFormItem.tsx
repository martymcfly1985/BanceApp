import { Form, Input } from "antd"

function FirstNameFormItem({
  ...props
}: React.ComponentProps<typeof Form.Item>) {
  return(
    <Form.Item
      {...props}
      name='firstName'
      rules={[
        // eslint-disable-next-line no-useless-escape
        { pattern: /^\S*$/, message: 'First name cannot contain spaces.' },
        { whitespace: true, message: 'Please enter your first name.' },
        { required: true, message: 'Please enter your first name.' }
      ]}
    >
      <Input
        placeholder='First Name'
      />
    </Form.Item>
  );
}

export default FirstNameFormItem