import { Button, Card, Result, Row } from "antd";
import { post } from "../../CommonFunctions/HttpMethods";

interface SuccessfulSignUpProps {
  newUserEmail: string | undefined;
  newUserFirstName: string | undefined;
}

function SuccessfulSignUp({
  newUserEmail,
  newUserFirstName
}: SuccessfulSignUpProps) {

  const onPageLeave = () => {
    post('api/sendVerificationEmail', newUserEmail);
    window.location.replace('/verify'); 
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
      <Card>
        <Result
          status="success"
          title={`Thank you for signing up for BanceApp ${newUserFirstName}!`}
          subTitle={`We will send you a verification link to your ${newUserEmail} email address`}
          extra={[
            <Button size="large" key="signin" type="primary" onClick={onPageLeave}>
              Return to Sign In
            </Button>
          ]}
        />
      </Card>
    </Row>
  );
} 

export default SuccessfulSignUp
