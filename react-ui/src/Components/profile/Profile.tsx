import { Avatar, Button, Col, Form, Layout, Row, Space, Typography } from "antd"
import '../../css/Profile.css';
const { Title } = Typography;
import { UploadOutlined } from '@ant-design/icons';
import { useUser } from "../../Hooks/useUser";
import FirstNameFormItem from "../form-items/FirstNameFormItem";
import LastNameFormItem from "../form-items/LastNameFormItem";
import UsernameFormItem from "../form-items/UsernameFormItem";
import { useState } from "react";
import PasswordFormItem from "../form-items/PasswordFormItem";
import EmailFormItem from "../form-items/EmailFormItem";
import CityStateFormItem from "../form-items/CityStateFormItem";

function Profile() {
  const userInfo = useUser();
  const [validatingUsername, setValidatingUsername] = useState(false);
  const [validatingEmail, setValidatingEmail] = useState(false);

  return (
    <Row style={{paddingTop:'10%'}}>
      <Col span={4}>col-1</Col>
      <Col style={{paddingLeft:'5%', paddingRight:'5%'}} span={10}>
        <Form layout={'vertical'}>
          <FirstNameFormItem required={false} label={'First Name:'}/>
          <LastNameFormItem required={false} label={'Last Name:'}/>
          <EmailFormItem required={false} label='Email Address:' onEmailValidating={(validating) => {
            setValidatingEmail(validating);
          }}/>
          <UsernameFormItem required={false} label={'Username:'} onUsernameValidating={(validating) => {
            setValidatingUsername(validating);
          }}/>
          <PasswordFormItem required={false} passwordLabel={'New Password:'} confirmPasswordLabel={'Confirm New Password:'}/>
          <CityStateFormItem required={false} stateLabel={'State:'} cityLabel={'City:'}/>
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
        </Form>
      </Col>
      <Col style={{textAlign: 'center'}} span={6}>
        <Space direction="vertical">
          <Title level={4}>{userInfo?.firstName} {userInfo?.lastName}</Title>
          <Avatar className='profile-page-avatar' size={120}>{`${userInfo?.firstName.substring(0, 1)}${userInfo?.lastName.substring(0, 1)}`}</Avatar>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Space>
      </Col>
      <Col span={4}>col-4</Col>
    </Row>
  )
}

export default Profile