import { Button, Card, Col, message, Row, Space, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import VerificationInput from "react-verification-input";
import { post } from '../../CommonFunctions/HttpMethods';
import { VerificationInformation } from '../../Models/User';

const {Title} = Typography;

function Verify() {
  const params = useParams();
  const navigate = useNavigate();
  const onVerifyAccountCode = async(value: string) => {
    const verificationInformation: VerificationInformation = {
      email: params.userEmail ?? "",
      verificationCode: Number(value)
    }
    const isVerificationCodeCorrect = await post('api/verifyAccount', verificationInformation);
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
            <Title level={3}>Please enter your verfication code below.</Title>
            <VerificationInput
              placeholder=""
              validChars="0-9"
              inputProps={{ inputMode: "numeric" }}
              length={6}
              onComplete={(value) => onVerifyAccountCode(value)}
            />
            <Button type='primary' onClick={() => {message.success('New Verification Code Sent!')}}>Re-Send Code</Button>
          </Space>
        </Card>
      </Col>
    </Row>
  )
}

export default Verify
