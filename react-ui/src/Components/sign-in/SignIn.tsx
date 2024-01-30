import { Alert, Button, Card, Checkbox, Col, Form, Input, message, Row, Space } from "antd";
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { signIn } from '../../BusinessLogic/userActions';
const SignIn: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [incorrectLoginError, setIncorrectLoginError] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setIncorrectLoginError(false);
      setSubmitLoading(true);
      const sessionRecnum: string = await signIn(values);
      if (sessionRecnum !== undefined && sessionRecnum !== null) {
        localStorage.setItem("sessionRecnum", sessionRecnum)
        window.location.replace("/");
      } else {
        setIncorrectLoginError(true);
      }
      setSubmitLoading(false);
    } catch {
      setSubmitLoading(false);
      message.error('Unable to log in. Please try again later.');
    }
  }
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
        <Space direction="vertical" size={"small"}>
          {
            incorrectLoginError === true ?
              <Alert
                message='Username and/or password was incorrect.'
                type="error"
                showIcon
                closable={true}
              /> :
              undefined
          }
          <Card
            title='Sign In'
            style={{
              width: 400,
              borderColor: "gray"
            }}
            type='inner'
          >
            <Form
              name='signInForm'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete='off'
            >
              <Form.Item
                name='username'
                rules={[{ required: true, message: 'Please enter a username.' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please enter a password.' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name='rememberMe'
                valuePropName='checked'
              >
                <Checkbox>
                  Remember Me
                </Checkbox>
                <a
                  href=""
                  style={{ float: 'right' }}
                >
                  Forgot password?
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  loading={submitLoading}
                  type='primary'
                  htmlType='submit'
                  style={{ width: '100%' }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
        <Card
          style={{
            width: 400,
            borderColor: "gray"
          }}
        >
          <div style={{ alignItems: 'center' }}>
            New to BanceApp? &nbsp;
            <a href="/signup">
              Sign Up
            </a>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default SignIn
