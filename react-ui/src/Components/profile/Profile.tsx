import { Avatar, Button, Col, Divider, Form, Input, message, Modal, Row, Skeleton, Slider, Space, Switch, Typography } from "antd"
import '../../css/Profile.css';
const { Title } = Typography;
import { UploadOutlined } from '@ant-design/icons';
import { useUser } from "../../Hooks/useUser";
import FirstNameFormItem from "../form-items/FirstNameFormItem";
import LastNameFormItem from "../form-items/LastNameFormItem";
import UsernameFormItem from "../form-items/UsernameFormItem";
import { useEffect, useState } from "react";
import PasswordFormItem from "../form-items/PasswordFormItem";
import EmailFormItem from "../form-items/EmailFormItem";
import CityStateFormItem from "../form-items/CityStateFormItem";
import { LockOutlined } from '@ant-design/icons';
import { post } from "../../CommonFunctions/HttpMethods";
import { IUser } from "../../Models/User";

function Profile() {
  const userInfo = useUser();
  const [validatingUsername, setValidatingUsername] = useState(false);
  const [validatingEmail, setValidatingEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPasswordModalOpen, setCurrentPasswordModalOpen] = useState(false);
  const [currentPasswordValidating, setCurrentPasswordValidating] = useState(false);
  const [newUserInformation, setNewUserInformation] = useState<IUser | undefined>(undefined);
  const [publicValue, setPublicValue] = useState<boolean | undefined>(undefined);
  const [skillLevelValue, setSkillLevelValue] = useState<number | undefined>(undefined);
  useEffect(() => {
    if(userInfo) {
      setLoading(false);
    }
  }, [userInfo])
  const currentPasswordCorrect = async (username: string | undefined, currentPassword: string) => {
    return post<boolean>('api/validatePassword', {username, password: currentPassword})
  }
  return (
    <>
      <Modal 
        title='Please enter your current password to save changes.' 
        open={currentPasswordModalOpen} 
        okText='Submit' 
        okButtonProps={{form:'confirmCurrentPasswordForm', htmlType:'submit'}}
        onCancel={() => {setCurrentPasswordModalOpen(false)}}
        closable={false}
        maskClosable={false}
        destroyOnClose={true}
      >
        <Form id='confirmCurrentPasswordForm' onFinish={async () => {
          try {
            await post('api/updateUser', newUserInformation);
            message.success('User information updated successfully!');
            setCurrentPasswordModalOpen(false);
          } catch {
            message.error('Unable to update user information. Please try again later.');
          }
        }}>
          <Form.Item
            style={{paddingTop: '25px'}}
            name='currentPassword'
            validateTrigger='onBlur'
            rules={[
              { required: true, message: 'Please enter a password.' },
              () => ({
                async validator(_, currentPassword) {
                  setCurrentPasswordValidating(true);
                  try {
                    if (await currentPasswordCorrect(userInfo?.username, currentPassword)) {
                      setCurrentPasswordValidating(false);
                      return Promise.resolve();
                    }
                    setCurrentPasswordValidating(false);
                    return Promise.reject(new Error('Incorrect Password.'));
                  } catch {
                    return Promise.reject(new Error('Unable to validate password.'));
                  }
                },
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Row style={{paddingTop:'1vh'}}>
        <Divider/>       
        <Col span={4}></Col>
        <Col style={{paddingLeft:'5%', paddingRight:'5%'}} span={10}>
          {loading === true ? 
            (
              <Space direction='vertical' size={'large'} style={{width: "100%"}}>
                <Skeleton.Input active={true} size={'default'} block={true}/>
                <Skeleton.Input active={true} size={'default'} block={true}/>
                <Skeleton.Input active={true} size={'default'} block={true}/>
                <Skeleton.Input active={true} size={'default'} block={true}/>
                <Skeleton.Input active={true} size={'default'} block={true}/>
                <Skeleton.Input active={true} size={'default'} block={true}/>
                <Skeleton.Input active={true} size={'default'} block={true}/>
                <Skeleton.Input active={true} size={'default'} block={true}/>
              </Space>
            ) : (
              <Form 
                id='ProfileForm' 
                onFinish={(values) => {
                  console.log(values)
                  const newUserInformation = {
                    recnum: userInfo!.recnum,
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    city: values.city,
                    state: values.state,
                    public: publicValue ?? userInfo!.public,
                    skillLevel: skillLevelValue ?? userInfo!.skillLevel,
                    role: userInfo!.role,
                    verified: userInfo!.verified
                  }
                  setNewUserInformation(newUserInformation)
                  setCurrentPasswordModalOpen(true)
                }} 
                initialValues={{ firstName: userInfo?.firstName, lastName: userInfo?.lastName, email: userInfo?.email, username: userInfo?.username, city: userInfo?.city, state: userInfo?.state}} 
                layout={'vertical'}
              >
                <FirstNameFormItem required={false} label={'First Name:'}/>
                <LastNameFormItem required={false} label={'Last Name:'}/>
                <EmailFormItem currentEmail={userInfo?.email} required={false} label='Email Address:' onEmailValidating={(validating) => {
                  setValidatingEmail(validating);
                }}/>
                <UsernameFormItem currentUsername={userInfo?.username} required={false} label={'Username:'} onUsernameValidating={(validating) => {
                  setValidatingUsername(validating);
                }}/>
                <PasswordFormItem passwordRequired={false} passwordLabel={'New Password:'} confirmPasswordLabel={'Confirm New Password:'}/>
                <CityStateFormItem required={false} stateLabel={'State:'} cityLabel={'City:'}/>
              </Form> 
            )
          }
        </Col>
        <Col style={{textAlign: 'center'}} span={6}>
          {loading === true ? 
            (
              <Space direction='vertical'>
                <Skeleton active={true} title={true} paragraph={false}/>
                <Skeleton.Avatar active={true} size={120} shape={"circle"} />
                <Skeleton.Button active={true} size={'default'} shape={'default'} block={true} />
              </Space>
            ) : (
              <Space direction='vertical' size={'large'} style={{width: '100%'}}>
                <Title level={4}>{userInfo?.firstName} {userInfo?.lastName}</Title>
                <Avatar className='profile-page-avatar' size={120}>{`${userInfo?.firstName.substring(0, 1)}${userInfo?.lastName.substring(0, 1)}`}</Avatar>
                <Button icon={<UploadOutlined />}>Upload</Button>
                <Switch onChange={(checked) => (setPublicValue(checked))} defaultChecked={userInfo?.public} checkedChildren='Public' unCheckedChildren='Private'></Switch>
                <Typography style={{textAlign:'left'}}>Skill Level:</Typography>
                <Slider onChange={(value) => (setSkillLevelValue(value))} defaultValue={userInfo?.skillLevel} max={5} step={.5} marks={{0: '0.0', 0.5: '0.5', 1: '1.0', 1.5: '1.5', 2: '2.0', 2.5: '2.5', 3: '3.0', 3.5: '3.5', 4: '4.0', 4.5: '4.5', 5: '5.0'}}></Slider>
              </Space>
            )
          }
        </Col>
        <Col span={4}></Col>
        <Divider/>
      </Row>
      <Row>
        <Col span={24} style={{textAlign: 'center'}}>
          <Form.Item>
            <Button
              form='ProfileForm'
              type='primary'
              htmlType='submit'
              style={{ width: '30%'}}
              disabled={validatingUsername || validatingEmail}
              >
              Save Changes
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default Profile