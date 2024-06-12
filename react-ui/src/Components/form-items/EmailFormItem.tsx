import { Form, Input } from "antd";
import { post } from "../../CommonFunctions/HttpMethods";

interface EmailFormItemProps {
  onEmailValidating(validating: boolean): void;
}

function EmailFormItem({
  onEmailValidating,
  ...props
}: EmailFormItemProps & React.ComponentProps<typeof Form.Item>) {
  const emailIsUnique = async (newEmail: string) => {
    return post<boolean>('api/isEmailUnique', newEmail)
  }
  return (
    <Form.Item
      {...props}
      name='email'
      validateTrigger='onBlur'
      validateFirst={true}
      rules={[
        { required: true, message: 'Please enter a valid email address.' },
        { type: 'email', message: 'Please input a valid email.' },
        () => ({
          async validator(_, email) {
            onEmailValidating(true);
            try {
              if (await emailIsUnique(email)) {
                onEmailValidating(false);
                return Promise.resolve();
              }
              onEmailValidating(false);
              return Promise.reject(new Error('Email is already in use.'));
            } catch {
              return Promise.reject(new Error('Unable to validate email address.'));
            }
          },
        })
      ]}
    >
      <Input
        placeholder='Email Address'
      />
    </Form.Item>
  );
}

export default EmailFormItem