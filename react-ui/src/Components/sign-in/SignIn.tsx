import { Button, Card, Checkbox, Col, Form, Input, message, Row } from "antd";
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { getUserInformation } from '../../BusinessLogic/userActions';

const SignIn: React.FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const onFinish = async(values: any) => {
    try {
      setSubmitLoading(true);
      const userStatus = await getUserInformation(values);
      console.log(userStatus);
      if (userStatus !== undefined && userStatus !== null)
      {
        message.success('User was logged in.');
      } else {
        message.error('User was not logged in.');
      }
      setSubmitLoading(false);
    } catch {
      setSubmitLoading(false);
      message.error('Unable to create new user.');
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
        <Card
          loading={submitLoading}
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
                prefix={<UserOutlined/>} 
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: 'Please enter a password.' }]}
            >
              <Input.Password 
                prefix={<LockOutlined/>} 
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
                style={{float: 'right'}}
              >
                Forgot password?
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{width: '100%'}}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card
          style={{
            width: 400,
            borderColor: "gray"
          }}
        >
          <div style={{alignItems: 'center'}}>
            New to BanceApp? &nbsp;
            <a href="signup">
              Sign Up
            </a>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default SignIn
