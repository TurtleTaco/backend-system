import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Upload,
  Descriptions,
  Divider,
  message,
  Table,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import Iframe from "react-iframe";

import Repo from "./repository/repository";

const { Column, ColumnGroup } = Table;
const { Option } = Select;

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function endOrder(ID, sideMenuSetRefresh) {
  // add this to order db
  let repo = new Repo(
    "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
    "fir-7b423.firebaseapp.com",
    "fir-7b423"
  );

  // add tracking website + actual postage to the existing order
  repo.orders.finishOrder(ID).then((e) => {
    sideMenuSetRefresh(true);
    // alert for order maked as finish
    message.info("Marked Order as Completed");
  });
}

function openTrackingLink(link) {
  console.log("Clicked");
  window.open(link);
}

const InTransitDetail = (props: TobeShippedDetailProps) => {
  const onFormLayoutChange = ({ size }) => {};
  //   console.log(props.test);

  // console.log(props.sideMenuSetRefresh);

  // hold form details
  const [submitObject, setSubmitObject] = useState({
    Tracking: "",
    实际邮资: "",
    邮资凭据: "",
  });
  const [itemsBought, setItemsBought] = useState([{ Product: "", Size: "" }]);

  useEffect(() => {
    // ???????????????????????????????????????????????
    // may be caused by react strict mode under development environment
    // the render is triggered twice, if not checking for empty
    // the second render will give the itemsBought an undefined object
    // thus overwriting the initial [{ Product: "", Size: "" }] which is a valid table data input
    // undefined itemsBought causes table not being able to render
    if (Object.keys(props.rowProduct).length != 0) {
      setItemsBought(props.rowProduct);
      console.log(props.rowProduct);
    }
  }, [props.rowProduct]);

  // purchased item name + size
  // console.log(itemsBought);

  const columns = [
    {
      title: "Product",
      dataIndex: "Product",
      key: "product",
    },
    {
      title: "Size",
      dataIndex: "Size",
      key: "size",
    },
  ];

  return (
    <>
      <div
        style={{ marginTop: "25px", marginLeft: "20px", marginRight: "20px" }}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{}}
          onValuesChange={onFormLayoutChange}
          key={props.test}
          style={{ padding: "0px 0px 0px 0px" }}
        >
          <Form.Item label="问候" style={{ marginTop: "25px" }}>
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={
                "宝宝您的订单已经发出 详情可以在这个link中查询！" +
                props.test["Tracking"]
              }
            />
          </Form.Item>

          <Form.Item label="Action">
            <Button
              type="primary"
              onClick={() => {
                navigator.clipboard.writeText(
                  "宝宝您的订单已经发出 详情可以在这个link中查询！" +
                    props.test["Tracking"]
                );
                // alert for successful copy
                message.info("Copied Greeting");
              }}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              拷贝问候
            </Button>

            <Button
              type="primary"
              onClick={() => openTrackingLink(props.test["Tracking"])}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              跟踪订单
            </Button>

            <Button
              type="primary"
              onClick={() =>
                endOrder(props.test["ID"], props.sideMenuSetRefresh)
              }
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              完成订单
            </Button>
          </Form.Item>

          <Divider plain>出单信息汇总</Divider>
          <Form.Item label="递送方式">
            <Radio.Group value={props.test["寄送"]}>
              <Radio.Button
                value="邮寄"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "10px",
                }}
              >
                邮寄
              </Radio.Button>
              <Radio.Button
                value="送货"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "10px",
                }}
              >
                送货
              </Radio.Button>
              <Radio.Button
                value="自取"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "10px",
                }}
              >
                自取
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <div>
            <Form.Item label="单品">
              <Table
                // eg.
                // dataSource={[
                //   { Product: "jack", Size: "L" },
                //   { Product: "Ess", Size: "M" },
                // ]}
                dataSource={itemsBought}
                columns={columns}
                pagination={false}
                size="small"
                scroll={{ x: 240 }}
              />
            </Form.Item>
          </div>
          <Form.Item label="Order ID">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["ID"]}
            />
          </Form.Item>
          <Form.Item label="姓名">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["姓名"]}
            />
          </Form.Item>
          <Form.Item label="微信号">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["微信号"]}
            />
          </Form.Item>
          <Form.Item label="地址">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["地址"]}
            />
          </Form.Item>
          <Form.Item label="邮编">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["邮编"]}
            />
          </Form.Item>
          <Form.Item label="电话">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["Tel"]}
            />
          </Form.Item>
          <Form.Item label="出单日期">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["日期"]}
            />
          </Form.Item>
          <Form.Item label="支付邮资">
            <InputNumber
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["支付邮资"]}
            />
          </Form.Item>
          <Form.Item label="加急发货">
            <Switch
              disabled={true}
              style={{ color: "#000000" }}
              checked={props.test["加急"] == "Y"}
            />
          </Form.Item>
          <Form.Item label="礼物包装">
            <Switch
              disabled={true}
              style={{ color: "#000000" }}
              checked={props.test["礼物"] == "Y"}
            />
          </Form.Item>

          <Form.Item label="实际邮资">
            <InputNumber
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["实际邮资"]}
            />
          </Form.Item>

          <Form.Item label="Tracking">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              href={props.test["Tracking"]}
              value={props.test["Tracking"]}
            />
          </Form.Item>

          {/* <Form.Item
          name="upload"
          label="邮资凭据"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item> */}
        </Form>
      </div>
    </>
  );
};

export default InTransitDetail;
