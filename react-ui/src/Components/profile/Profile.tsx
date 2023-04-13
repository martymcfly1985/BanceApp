import { Avatar, Button, Layout, Space, Typography } from "antd"
import { Content } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import '../../css/Profile.css';
const { Title } = Typography;
import { UploadOutlined } from '@ant-design/icons';

function Profile() {
  const siderStyle: React.CSSProperties = {
    // textAlign: 'center',
    // lineHeight: '120px',
    backgroundColor: '#efefef'
  };

  return (
    <Layout>
      <Content>Content</Content>
      <Sider
        style={siderStyle}
        width={'30%'}
      >
        <Space className='profile-page-sider' direction="vertical">
          <Title level={4}>{sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}</Title>
          <Avatar className='profile-page-avatar' size={120}>{`${sessionStorage.getItem("firstName")?.substring(0, 1)}${sessionStorage.getItem("lastName")?.substring(0, 1)}`}</Avatar>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Space>
      </Sider>
    </Layout>
  )
}

export default Profile