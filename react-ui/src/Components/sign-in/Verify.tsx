import { Button, Card, Col, Input, message, Row, Space, Typography, } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { post } from '../../CommonFunctions/HttpMethods';
import { VerificationInformation } from '../../Models/User';
import { useState } from 'react';

const {Title} = Typography;

function Verify() {
  const params = useParams();
  const navigate = useNavigate();
  const [verificationLoading, setVerificationLoading] = useState(false);

  const backSpaceEmptySpaceOrNumber = (input: string) => {
    return /[0-9\\B]/.test(input);
  }

  const onVerifyAccountCode = async(value: string) => {
    const verificationInformation: VerificationInformation = {
      email: params.userEmail ?? "",
      verificationCode: Number(value)
    }
    setVerificationLoading(true);
    const isVerificationCodeCorrect = await post('api/verifyAccount', verificationInformation);
    setVerificationLoading(false);
    if (isVerificationCodeCorrect) {
      navigate("/signIn"); 
    } else {
      message.error('Invalid code. Please try again.')
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
        <Card>
          <Space direction="vertical" size={"middle"} style={{alignItems:'center'}}>
            <Title>Welcome to BanceApp!</Title>
            <Title level={3}>Please enter your verification code below.</Title>
            <Input.OTP 
              length={6} 
              onChange={(value) => onVerifyAccountCode(value)}
              size={"large"}
              variant={"filled"}
              status={"error"}
              disabled={verificationLoading}
              onKeyDown={(event) => {
                if (!backSpaceEmptySpaceOrNumber(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <Button type='primary' onClick={() => {message.success('New Verification Code Sent!')}}>Re-Send Code</Button>
          </Space>
        </Card>
      </Col>
    </Row>
  )
}

export default Verify
