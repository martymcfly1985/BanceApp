import { Button, Card, Col, Form, Row } from "antd";
import { useState } from "react";
import CityStateFormItem from "../form-items/CityStateFormItem";
import EmailFormItem from "../form-items/EmailFormItem";
import FirstNameFormItem from "../form-items/FirstNameFormItem";
import LastNameFormItem from "../form-items/LastNameFormItem";
import PasswordFormItem from "../form-items/PasswordFormItem";
import UsernameFormItem from "../form-items/UsernameFormItem";

interface SignUpFormProps {
  submitLoading: boolean;
  onFinish(newUser: any): void;
}

function SignUpForm({
  submitLoading,
  onFinish
}: SignUpFormProps) {
  const [validatingUsername, setValidatingUsername] = useState(false);
  const [validatingEmail, setValidatingEmail] = useState(false);
  return (
    <Row
      align='middle'
      itemType="flex"
      justify='center'
      style={{
        minHeight: '100vh',
        backgroundColor: '#efefef'
      }}
    >
      <Col>
        <Card
          title='Sign Up'
          style={{
            width: 500,
            borderColor: "gray"
          }}
          loading={submitLoading}
        >
          <Form
            name='signUpForm'
            onFinish={onFinish}
            autoComplete='off'
          >
            <EmailFormItem onEmailValidating={(validating) => {
              setValidatingEmail(validating);
            }}/>
            <UsernameFormItem onUsernameValidating={(validating) => {
              setValidatingUsername(validating);
            }}/>
            <PasswordFormItem/>
            <FirstNameFormItem/>
            <LastNameFormItem/>
            <CityStateFormItem/>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
                disabled={validatingUsername || validatingEmail}
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                type='link'
                htmlType='button'
                style={{ width: '100%' }}
                href="/signin"
              >
                Return to Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default SignUpForm