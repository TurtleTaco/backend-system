import { Statistic, Row, Col, Divider, Card } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import "./Overview.css";

const Overview = (props: TobeShippedDetailProps) => {
  return (
    <Row gutter={16} style={{ padding: "0px 50px 0px 50px" }}>
      <Col span={12}>
        <Statistic title="月售额" value={45034.29} prefix={<LikeOutlined />} />
      </Col>
      <Col span={12}>
        <Statistic title="当月出单" value={50} />
      </Col>
      <Divider plain></Divider>
    </Row>
  );
};

export default Overview;
