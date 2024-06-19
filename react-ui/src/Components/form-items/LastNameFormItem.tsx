import { Form, Input } from "antd"

function LastNameFormItem({
  ...props
}: React.ComponentProps<typeof Form.Item>){
  return(
    <Form.Item
      {...props}
      name='lastName'
      rules={[
        // eslint-disable-next-line no-useless-escape
        { pattern: /^\S*$/, message: 'Last name cannot contain spaces.' },
        { whitespace: true, message: 'Please enter your last name.' },
        { required: true, message: 'Please enter your last name.' }
      ]}
    >
      <Input
        placeholder='Last Name'
      />
    </Form.Item>
  );
}

export default LastNameFormItem