import { Button, Card, Col, Form, Input, Row } from 'antd';
import React from 'react';

const SignUp: React.FC = () => {
  const onFinish = () => {
    console.log('r');
  };

  const validateMessages = {
    string: {
      min: "Password must be at least ${min} characters in length.",
    }
  };

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
        >
          <Form
            name='signUpForm'
            onFinish={onFinish}
            autoComplete='off'
            validateMessages={validateMessages}
          >
            <Form.Item
              name='username'
              rules={[{required: true, message: 'Please enter a username.'}]}
            >
              <Input
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {required: true, message: 'Please enter a password.'},
                {min: 8}
              ]}
            >
              <Input.Password 
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name='confirmPassword'
              rules={[
                { required: true, message: 'Please confirm your password.' },
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
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{width: '100%'}}
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <Button
                type='link'
                htmlType='button'
                style={{width: '100%'}}
                href="signin"
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

export default SignUp