import { Card, Col, Row } from "antd";

const SuccessfulSignUp: React.FC = () => {
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
          <h2>Thank you for signing up!</h2>
        </Card>
      </Col>
    </Row>
  );
} 

export default SuccessfulSignUp
