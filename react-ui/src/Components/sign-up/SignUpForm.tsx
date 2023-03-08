import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { City } from "country-state-city";
import { useState } from "react";
import { post } from "../../CommonFunctions/HttpMethods";

interface SignUpFormProps {
  submitLoading: boolean;
  onFinish(newUser: any): void;
}

function SignUpForm({
  submitLoading,
  onFinish
}: SignUpFormProps) {
  const intialCityList: any[] = []
  const [citiesList, setCitiesList] = useState(intialCityList);
  const [validatingUsername, setValidatingUsername] = useState(false);
  const [validatingEmail, setValidatingEmail] = useState(false);

  const populateCitySelect = (state: string) => {
    const cities = City.getCitiesOfState('US', state);
    const citiesList = cities.map((city) => {
      return { value: city.name, label: city.name }
    })
    setCitiesList(citiesList)
  }

  const usernameIsUnique = async (newUsername: string) => {
    return post<boolean>('api/isUsernameUnique', newUsername)
  }

  const emailIsUnique = async (newEmail: string) => {
    return post<boolean>('api/isEmailUnique', newEmail)
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
            <Form.Item
              name='email'
              validateTrigger='onBlur'
              validateFirst={true}
              rules={[
                { required: true, message: 'Please enter a valid email address.' },
                { type: 'email', message: 'Please input a valid email.' },
                () => ({
                  async validator(_, email) {
                    setValidatingEmail(true);
                    try {
                      if (await emailIsUnique(email)) {
                        setValidatingEmail(false);
                        return Promise.resolve();
                      }
                      setValidatingEmail(false);
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
            <Form.Item
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
                    setValidatingUsername(true);
                    try {
                      if (await usernameIsUnique(username)) {
                        setValidatingUsername(false);
                        return Promise.resolve();
                      }
                      setValidatingUsername(false);
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
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please enter a password.' },
                { whitespace: true, message: 'Passwords cannot contain only white space.' },
                { min: 8, message: "Password must be at least ${min} characters in length." }
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
            <Form.Item
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
            <Form.Item
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
            <Form.Item
              name='state'
              rules={[
                { required: true, message: 'Please enter your state.' }
              ]}
            >
              <Select
                placeholder='State'
                showSearch={true}
                onChange={(value) => {
                  populateCitySelect(value);
                }}
                filterOption={(input, option) => {
                  return (
                    option !== undefined && option !== null && (option.value.toLowerCase().includes(input.toLowerCase()) ||
                    option.label.toLowerCase().includes(input.toLowerCase()))
                  );
                }}
                options={[
                  { value: 'AL', label: 'Alabama' },
                  { value: 'AK', label: 'Alaska' },
                  { value: 'AZ', label: 'Arizona' },
                  { value: 'AR', label: 'Arkansas' },
                  { value: 'CA', label: 'California' },
                  { value: 'CO', label: 'Colorado' },
                  { value: 'CT', label: 'Connecticut' },
                  { value: 'DE', label: 'Delaware' },
                  { value: 'FL', label: 'Florida' },
                  { value: 'GA', label: 'Georgia' },
                  { value: 'HI', label: 'Hawaii' },
                  { value: 'ID', label: 'Idaho' },
                  { value: 'IL', label: 'Illinois' },
                  { value: 'IN', label: 'Indiana' },
                  { value: 'IA', label: 'Iowa' },
                  { value: 'KS', label: 'Kansas' },
                  { value: 'KY', label: 'Kentucky' },
                  { value: 'LA', label: 'Louisiana' },
                  { value: 'ME', label: 'Maine' },
                  { value: 'MD', label: 'Maryland' },
                  { value: 'MA', label: 'Massachusetts' },
                  { value: 'MI', label: 'Michigan' },
                  { value: 'MN', label: 'Minnesota' },
                  { value: 'MS', label: 'Mississippi' },
                  { value: 'MO', label: 'Missouri' },
                  { value: 'MT', label: 'Montana' },
                  { value: 'NE', label: 'Nebraska' },
                  { value: 'NV', label: 'Nevada' },
                  { value: 'NH', label: 'New Hampshire' },
                  { value: 'NJ', label: 'New Jersey' },
                  { value: 'NM', label: 'New Mexico' },
                  { value: 'NY', label: 'New York' },
                  { value: 'NC', label: 'North Carolina' },
                  { value: 'ND', label: 'North Dakota' },
                  { value: 'OH', label: 'Ohio' },
                  { value: 'OK', label: 'Oklahoma' },
                  { value: 'OR', label: 'Oregon' },
                  { value: 'PA', label: 'Pennsylvania' },
                  { value: 'RI', label: 'Rhode Island' },
                  { value: 'SC', label: 'South Carolina' },
                  { value: 'SD', label: 'South Dakota' },
                  { value: 'TN', label: 'Tennessee' },
                  { value: 'TX', label: 'Texas' },
                  { value: 'UT', label: 'Utah' },
                  { value: 'VT', label: 'Vermont' },
                  { value: 'VA', label: 'Virginia' },
                  { value: 'WA', label: 'Washington' },
                  { value: 'WV', label: 'West Virginia' },
                  { value: 'WI', label: 'Wisconsin' },
                  { value: 'WY', label: 'Wyoming' }
                ]}
              />
            </Form.Item>
            <Form.Item
              name='city'
              rules={[
                { required: true, message: 'Please enter your city.' }
              ]}
            >
              <Select
                placeholder='City'
                showSearch={true}
                options={citiesList}
                disabled={citiesList.length === 0}
              />
            </Form.Item>
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

export default SignUpForm