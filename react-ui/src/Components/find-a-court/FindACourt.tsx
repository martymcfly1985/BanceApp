import { Content } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { fetchCourtData } from "../../BusinessLogic/courtActions";

class FindACourt extends React.Component {
  async componentDidMount() {
    const court = await fetchCourtData();
    console.log(court);
  }
  render() {
    return (
      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">Find a Court</div>
      </Content>
    );
  }
}

export default FindACourt;