import { Button, Card, Col, message, Row, Space, Typography } from 'antd';
import React from 'react';
import VerificationInput from "react-verification-input";

const {Title} = Typography;

const Verify: React.FC = () => {

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
              onComplete={(value) => {console.log(value)}}
            />
            <Button type='primary' onClick={() => {message.success('New Verification Code Sent!')}}>Re-Send Code</Button>
          </Space>
        </Card>w
      </Col>
    </Row>
  )
}

export default Verify
