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
  Table,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import Repo from "./repository/repository";

const { Column, ColumnGroup } = Table;

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

function deleteToBeShipped(object, ID, sideMenuSetRefresh) {
  // add this to order db
  let repo = new Repo(
    "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
    "fir-7b423.firebaseapp.com",
    "fir-7b423"
  );

  // add tracking website + actual postage to the existing order
  // then -> trigger side menu refresh state change
  repo.orders.deleteOrder(object, ID).then((e) => sideMenuSetRefresh(true));
}

const TobeShippedDetail = (props: TobeShippedDetailProps) => {
  const onFormLayoutChange = ({ size }) => {};

  console.log(props.test);
  // hold form details
  const [submitObject, setSubmitObject] = useState({
    Tracking: "",
    实际邮资: "",
    邮资凭据: "",
  });

  // deliver method
  // ?????????????????????????????????????????????
  const [deliverMethod, setDeliverMethod] = useState(props.test["寄送"]);
  const [itemsBought, setItemsBought] = useState([{ Product: "", Size: "" }]);
  // !!!!!!!!!!!!!!!!!
  // rerender can only be triggered by state change
  // props changes cannot be synced to state with useState
  // useEffect sync props change to state and then trigger rerender
  // notice props change -> only triggers unmount and mount -> unmount, mount event is controlled by useEffect
  useEffect(() => {
    // code to run on component mount
    setDeliverMethod(props.test["寄送"]);

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
  }, [props.test["寄送"], props.rowProduct]);

  // purchased item name + size
  console.log(itemsBought);

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
          <Divider plain>出单信息</Divider>
          <Form.Item label="递送方式">
            <Radio.Group value={props.test["寄送"]}>
              <Radio.Button
                value="邮寄"
                style={{
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
          <Form.Item label="Order ID">
            <Input
              disabled={true}
              style={{ color: "#000000" }}
              value={props.test["ID"]}
            />
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

          {deliverMethod == "邮寄" ? (
            // 发货邮寄填写
            <div>
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
            </div>
          ) : (
            // 自取或送货，不需要填写邮寄信息
            <div></div>
          )}

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
              style={{
                marginRight: "10px",
              }}
            >
              提交
            </Button>
            <Button
              type="primary"
              onClick={() =>
                deleteToBeShipped(
                  submitObject,
                  props.test["ID"],
                  props.sideMenuSetRefresh
                )
              }
              style={{
                marginLeft: "10px",
              }}
            >
              删除订单
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default TobeShippedDetail;
