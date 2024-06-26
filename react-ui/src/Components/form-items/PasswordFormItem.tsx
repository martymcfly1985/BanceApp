import { Form, Input } from "antd";

interface PasswordFormItemProps{
  passwordLabel?: string | undefined,
  confirmPasswordLabel?: string | undefined,
  passwordRequired?: boolean | undefined
}
function PasswordFormItem({
  passwordLabel,
  confirmPasswordLabel,
  passwordRequired = true,
  ...props
}: PasswordFormItemProps & React.ComponentProps<typeof Form.Item>) {
  return (
    <>
      <Form.Item
        label={passwordLabel}
        required={passwordRequired}
        {...props}
        name='password'
        rules={[
          { required: passwordRequired, message: 'Please enter a password.' },
          { whitespace: true, message: 'Passwords cannot contain only white space.' },
          { min: 8, message: "Password must be at least ${min} characters in length." }
        ]}
      >
        <Input.Password
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        label={confirmPasswordLabel}
        required={passwordRequired}
        {...props}
        name='confirmPassword'
        rules={[
          { required: passwordRequired, message: 'Please confirm your password.' },
          ({ getFieldValue }) => ({
            validator(_, confirmPassword) {
              if (!confirmPassword || getFieldValue('password') === confirmPassword) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords must match.'));
            },
          }),
        ]}
        dependencies={['password']}
        hasFeedback
      >
        <Input.Password
          placeholder="Confirm Password"
        />
      </Form.Item>
    </>
  );
}

export default PasswordFormItem