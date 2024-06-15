import { Form, Input } from "antd";
import { post } from "../../CommonFunctions/HttpMethods"

interface UsernameFormItemProps {
  onUsernameValidating(validating: boolean): void;
  currentUsername?: string | undefined;
}

function UsernameFormItem({
  onUsernameValidating,
  currentUsername,
  ...props
}: UsernameFormItemProps & React.ComponentProps<typeof Form.Item>) {
  const usernameIsUnique = async (newUsername: string) => {
    if(newUsername === currentUsername) {
      return true;
    }
    return post<boolean>('api/isUsernameUnique', newUsername)
  }
  return (
    <Form.Item
      {...props}
      name='username'
      validateTrigger='onBlur'
      validateFirst={true}
      rules={[
        // eslint-disable-next-line no-useless-escape
        { pattern: /^\S*$/, message: 'Username cannot contain spaces.' },
        { required: true, message: 'Please enter a username.' },
        { whitespace: true, message: 'Please enter a username.' },
        () => ({
          async validator(_, username) {
            onUsernameValidating(true);
            try {
              if (await usernameIsUnique(username)) {
                onUsernameValidating(false);
                return Promise.resolve();
              }
              onUsernameValidating(false);
              return Promise.reject(new Error('Username is already in use.'));
            } catch {
              return Promise.reject(new Error('Unable to validate username.'));
            }
          },
        })
      ]}
    >
      <Input
        placeholder='Username'
      />
    </Form.Item>
  );
}

export default UsernameFormItem