import React, { useState } from "react";
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
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import Repo from "./repository/repository";

const { Option } = Select;

// tracking prefix is by default canada post
// consistent with select defult value
// on select option change, the trackingPrefix is changed accordingly
var trackingPrefix = "https://www.canadapost.ca/trackweb/en#/details/";
const trackAddressBefore = (
  <Select
    defaultValue="https://www.canadapost.ca/trackweb/en#/details/"
    className="select-before"
    onChange={(value, e) => (trackingPrefix = value)}
  >
    <Option value="https://www.canadapost.ca/trackweb/en#/details/">
      Canada Post
    </Option>
    <Option value="https://tools.usps.com/go/TrackConfirmAction?tLabels=">
      USPS
    </Option>
  </Select>
);

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function shippingInfoSubmit(object, ID, sideMenuSetRefresh) {
  console.log(object);
  // add tracking website prefix
  object["Tracking"] = trackingPrefix + object["Tracking"];

  // add this to order db
  let repo = new Repo(
    "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
    "fir-7b423.firebaseapp.com",
    "fir-7b423"
  );

  // add tracking website + actual postage to the existing order
  // then -> trigger side menu refresh state change
  repo.orders
    .insertOrderObjectByKey(object, ID)
    .then((e) => sideMenuSetRefresh(true));
}

const TobeShippedDetail = (props: TobeShippedDetailProps) => {
  const onFormLayoutChange = ({ size }) => {};

  // hold form details
  const [submitObject, setSubmitObject] = useState({
    Tracking: "",
    实际邮资: "",
    邮资凭据: "",
  });

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        onValuesChange={onFormLayoutChange}
        key={props.test}
        style={{ padding: "0px 24px 0px 24px" }}
      >
        <Divider plain>出单信息</Divider>
        <Form.Item label="递送方式">
          <Radio.Group value={props.test["寄送"]}>
            <Radio.Button value="邮寄">邮寄</Radio.Button>
            <Radio.Button value="送货">送货</Radio.Button>
            <Radio.Button value="自取">自取</Radio.Button>
          </Radio.Group>
        </Form.Item>
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

        {/* 发货填写 */}
        <Divider plain>邮寄填写</Divider>
        <Form.Item label="实际邮资">
          <InputNumber
            onChange={(e) => (submitObject["实际邮资"] = e.toString())}
          />
        </Form.Item>
        <Form.Item label="Tracking">
          <Input
            addonBefore={trackAddressBefore}
            onChange={(e) => (submitObject["Tracking"] = e.target.value)}
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

        <Form.Item label="Submit">
          <Button
            type="primary"
            onClick={() =>
              shippingInfoSubmit(
                submitObject,
                props.test["ID"],
                props.sideMenuSetRefresh
              )
            }
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TobeShippedDetail;
