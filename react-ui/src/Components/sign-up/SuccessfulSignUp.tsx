import { Button, Card, Row, Space } from "antd";

const SuccessfulSignUp: React.FC = () => {

  const onPageLeave = () => {
    sessionStorage.clear();
    window.location.replace("/SignIn");
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
      <Card >
        <Space style={{fontSize:20, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }} direction="vertical" size={'middle'}>
          <h1 >Thank you for signing up for BanceApp {sessionStorage.getItem("firstName")} !</h1>
          <h2>We will send you a verification link to your {sessionStorage.getItem("email")} email address</h2>
          <Button size="large" type="primary" onClick={onPageLeave}>
            Return to Sign In
          </Button>
        </Space>
      </Card>
    </Row>
  );
} 

export default SuccessfulSignUp
