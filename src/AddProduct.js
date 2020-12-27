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
  Divider,
  Table,
} from "antd";

import Repo from "./repository/repository";

function updateProductSubmit(object, ID, sideMenuSetRefresh) {
  console.log(object);

  // add this to order db
  let repo = new Repo(
    "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
    "fir-7b423.firebaseapp.com",
    "fir-7b423"
  );

  repo.products.updateOldProduct(object, ID).then((e) => {
    sideMenuSetRefresh(true);
    message.info("Product Updated");
  });
}

function newProductSubmit(object, sideMenuSetRefresh) {
  console.log(object);
  // add this to order db
  let repo = new Repo(
    "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
    "fir-7b423.firebaseapp.com",
    "fir-7b423"
  );
  repo.products.add(object).then((e) => {
    sideMenuSetRefresh(true);
    // alert for correct submision and clears the form
    message.info("New product Submitted");
  });
}

const AddProduct = (props: AddProductProps) => {
  const onFormLayoutChange = ({ size }) => {};

  var rowSelectedProductInfo = props.test;
  // console.log(props.sideMenuSetRefresh);

  var rowSelectedObject = {
    Name: props.test["Name"],
    S: props.test["S"],
    M: props.test["M"],
    L: props.test["L"],
    F: props.test["F"],
    CAD: props.test["CAD"],
  };

  var [newProductInsert, setNewProductInsertStatus] = useState(false);

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        onValuesChange={onFormLayoutChange}
        className="update-form"
      >
        <Form.Item label="新品">
          <Switch
            onClick={(status, e) =>
              status == true
                ? setNewProductInsertStatus(true)
                : setNewProductInsertStatus(false)
            }
            defaultChecked={false}
          />
        </Form.Item>

        {newProductInsert == true ? (
          //////////////////////// Add New Item ////////////////////////
          <div>
            <Form.Item label="Name" style={{ paddingTop: "25px" }}>
              <Input
                onChange={(e) => (rowSelectedObject["Name"] = e.target.value)}
              />
            </Form.Item>
            <Form.Item label="S">
              <InputNumber
                onChange={(e) => (rowSelectedObject["S"] = e.toString())}
              />
            </Form.Item>
            <Form.Item label="M">
              <InputNumber
                onChange={(e) => (rowSelectedObject["M"] = e.toString())}
              />
            </Form.Item>
            <Form.Item label="L">
              <InputNumber
                onChange={(e) => (rowSelectedObject["L"] = e.toString())}
              />
            </Form.Item>
            <Form.Item label="F">
              <InputNumber
                onChange={(e) => (rowSelectedObject["F"] = e.toString())}
              />
            </Form.Item>
            <Form.Item label="CAD">
              <InputNumber
                onChange={(e) => (rowSelectedObject["CAD"] = e.toString())}
              />
            </Form.Item>

            <Form.Item label="Submit">
              <Button
                className="update-form-button"
                type="primary"
                onClick={() =>
                  newProductSubmit(rowSelectedObject, props.sideMenuSetRefresh)
                }
              >
                提交新品
              </Button>
            </Form.Item>
          </div>
        ) : (
          //////////////////////// Update Old Item ////////////////////////
          <div>
            <Form.Item label="Name" style={{ paddingTop: "25px" }}>
              <Input disblaed={true} value={rowSelectedProductInfo["Name"]} />
            </Form.Item>
            <Form.Item label="ID">
              <Input
                readOnly={true}
                width="50px"
                value={rowSelectedProductInfo["ID"]}
              />
            </Form.Item>
            <Form.Item label="S">
              <InputNumber
                value={rowSelectedProductInfo["S"]}
                onChange={(e) => (rowSelectedObject["S"] = e.toString())}
              />
            </Form.Item>
            <Form.Item label="M">
              <InputNumber
                value={rowSelectedProductInfo["M"]}
                onChange={(e) => (rowSelectedObject["M"] = e.toString())}
              />
            </Form.Item>
            <Form.Item label="L">
              <InputNumber
                value={rowSelectedProductInfo["L"]}
                onChange={(e) => (rowSelectedObject["L"] = e.toString())}
              />
            </Form.Item>
            <Form.Item label="F">
              <InputNumber
                value={rowSelectedProductInfo["F"]}
                onChange={(e) => (rowSelectedObject["F"] = e.toString())}
              />
            </Form.Item>
            <Form.Item label="CAD">
              <InputNumber
                value={rowSelectedProductInfo["CAD"]}
                onChange={(e) => (rowSelectedObject["CAD"] = e.toString())}
              />
            </Form.Item>

            <Form.Item label="Submit">
              <Button
                className="update-form-button"
                type="primary"
                onClick={() =>
                  updateProductSubmit(
                    rowSelectedObject,
                    props.test["ID"],
                    props.sideMenuSetRefresh
                  )
                }
              >
                更新老款
              </Button>
            </Form.Item>
          </div>
        )}
      </Form>
    </>
  );
};

export default AddProduct;
