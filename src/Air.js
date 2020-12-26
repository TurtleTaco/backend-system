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
  message,
} from "antd";

import Repo from "./repository/repository";

function newOrderSubmit(object, sideMenuSetRefresh) {
  console.log(object);

  // add this to order db
  let repo = new Repo(
    "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
    "fir-7b423.firebaseapp.com",
    "fir-7b423"
  );
  repo.orders.add(object).then((e) => {
    sideMenuSetRefresh(true);
    // alert for correct submision and clears the form
    message.info("New Item Added");
  });
}

function onChange() {}

function selectionArea(props) {
  return (
    <Select
      mode="multiple"
      size="default"
      placeholder="Please select"
      defaultValue={[]}
      //   onChange={onChange}
      style={{ width: "100%", paddingLeft: "16px", paddingRight: "16px" }}
    >
      {props.products}
    </Select>
  );
}

const Air = (existingProductList, setRefresh) => {
  const onFormLayoutChange = ({ size }) => {};
  const { Option } = Select;
  const [numSelectionFields, setnumSelectionFields] = useState([""]);

  console.log(existingProductList);

  // construct products options
  const children = [];
  for (let i = 0; i < existingProductList.length; i++) {
    if (existingProductList[i]["S"] != "0")
      children.push(
        <Option key={existingProductList[i]["ID"] + "S"}>
          {existingProductList[i]["Name"] + " S" + existingProductList[i]["S"]}
        </Option>
      );
    if (existingProductList[i]["M"] != "0")
      children.push(
        <Option key={existingProductList[i]["ID"] + "M"}>
          {existingProductList[i]["Name"] + " M" + existingProductList[i]["S"]}
        </Option>
      );
    if (existingProductList[i]["L"] != "0")
      children.push(
        <Option key={existingProductList[i]["ID"] + "L"}>
          {existingProductList[i]["Name"] + " L" + existingProductList[i]["S"]}
        </Option>
      );
    if (existingProductList[i]["F"] != "0")
      children.push(
        <Option key={existingProductList[i]["ID"] + "F"}>
          {existingProductList[i]["Name"] + " F" + existingProductList[i]["S"]}
        </Option>
      );
  }

  // hold form details
  var [newItem, setNewItem] = useState("N");
  const [submitObject, setSubmitObject] = useState({
    Name: "",
    S: "",
    M: "",
    L: "",
    F: "",
    CAD: "",
  });

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        onValuesChange={onFormLayoutChange}
      >
        <Select
          mode="multiple"
          size="default"
          placeholder="Please select"
          defaultValue={[]}
          //   onChange={onChange}
          style={{
            width: "100%",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {children}
        </Select>
        <div label="Action" style={{ paddingLeft: "16px", marginTop: "20px" }}>
          <Button
            type="primary"
            onClick={() => {
              numSelectionFields.push("");
              console.log(numSelectionFields.length);
            }}
          >
            Add
          </Button>
          <Button
            type="primary"
            onClick={() => {
              newOrderSubmit(submitObject, setRefresh);
            }}
            style={{ marginLeft: "20px" }}
          >
            提交
          </Button>
        </div>
        {/* {numSelectionFields.forEach((key) => {
          console.log(key);
          return (
            <Select
              id={key}
              mode="multiple"
              size="default"
              placeholder="Please select"
              defaultValue={[]}
              //   onChange={onChange}
              style={{
                width: "100%",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              {children}
            </Select>
          );
        })} */}
      </Form>
    </>
  );
};

export default Air;
