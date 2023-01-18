import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import React from 'react';

const SignIn: React.FC = () => {
  const onFinish = () => {
    console.log('r');
  }
  return (
    <Row 
      align='middle'
      itemType="flex"
      justify='center'
      style={{
        minHeight: '100vh'
      }}
    >
      <Col>
        <Card
          title='Sign In'
          style={{
            width: 350,
          }}
        >
          <Form
            name='signInForm'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
          >
            <Form.Item
              label='Username'
              name='username'
              rules={[{ required: true, message: 'Please enter a username.' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please enter a password.' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='rememberMe'
              valuePropName='checked'
              wrapperCol={{offset: 8, span:16}}
            >
              <Checkbox>
                Remember Me
              </Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{offset: 8, span:16}}
            >
              <Button
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default SignIn
