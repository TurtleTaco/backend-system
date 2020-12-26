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

function newOrderSubmit(object, sideMenuSetRefresh, productsToBeOrdered) {
  console.log(object);

  // if 礼物 / 加急 is empty, meaning they are not required
  if (object["加急"] == "") object["加急"] = "N";
  if (object["礼物"] == "") object["礼物"] = "N";

  // add this to order db
  let repo = new Repo(
    "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
    "fir-7b423.firebaseapp.com",
    "fir-7b423"
  );

  var newOrderCreatedPromise = repo.runTransaction(function(transaction){
    
    var newOrderRef = repo.order.add({});

    var newOrderAddedPromise = transaction
    .set(newOrderRef, object)
    .then(function(){
        sideMenuSetRefresh(true);
        message.info("New Order Submitted");
    })
    .catch(function(e){ throw e; });

    return newOrderAddedPromise
    .then(function(){   
         
        var productRefsAndSizes = productsToBeOrdered.map(function(product){
            return [repo.products.collection.doc(product.ID), product.size];
        })

        productRefsAndSizes.forEach(function(productRefAndSize) {
            
            transaction.get(productRefAndSize[0]).then(function(product) {

                var updateParam;
                switch (productRefAndSize[1]) {
                    case "S" :
                        updateParam = {S : product.S - 1}
                    break;
                    case "M" :
                        updateParam = {M : product.M - 1}
                    break;
                    case "L" :
                        updateParam = {L : product.L - 1}
                    break;
                    case "F" :
                        updateParam = {F : product.F - 1}
                    break;
                }

                transaction
                .update(productRefAndSize[0], updateParam)
                .catch(function(e) {throw e;});
        })

     }).catch(function(e) { throw e; });
  });

  });
  
  newOrderCreatedPromise
  .then(function(){
        console.log("Succesfully created a new Order");
  }).catch(function(e){ throw e; });

};

const NewOrder = (setRefresh, cartProducts) => {
  const onFormLayoutChange = ({ size }) => {};
  const { SHOW_PARENT } = TreeSelect;

  // hold form details
  const [submitObject, setSubmitObject] = useState({
    Tel: "",
    Tracking: "",
    加急: "",
    发票: "",
    地址: "",
    姓名: "",
    实际邮资: "",
    寄送: "",
    微信号: "",
    支付邮资: "",
    交易金额: "",
    日期: "",
    礼物: "",
    邮编: "",
    邮资凭据: "",
  });

  // cart products display
  const [selectionType, setSelectionType] = useState("checkbox");

  var [productsToBeOrdered, setProductsToBeOrdered] = useState([]);

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      // enable the product name to be clickable
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Size",
      dataIndex: "size",
    },
    {
      title: "Product ID",
      dataIndex: "ID",
    },
  ];

  const cartData = [];
  const constructCartData = (cartProductList) => {
    var tableRowKey = 0;
    cartProductList.map((singleProduct) => {
      // eg: singleProduct
      // 0: "87mm mmlg黑色白logo长袖T恤新款"
      // 1: "MLzjrIcvKSHxcb5EqErI"
      // 2: "S: 1"
      cartData.push({
        key: tableRowKey.toString(),
        product: singleProduct[0],
        size: singleProduct[2],
        ID: singleProduct[1],
      });
      tableRowKey++;
    });
    console.log(cartData);
    return cartData;
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

    setProductsToBeOrdered(selectedRows.map(function(selectedProduct){
        return selectedProduct.ID;
    }))

      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        onValuesChange={onFormLayoutChange}
      >
        {/* List of items in the cart */}
        <div>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={constructCartData(cartProducts)}
            style={{ padding: "0px 24px 0px 24px" }}
          />
        </div>

        <Form.Item
          id="shippingMethod"
          label="寄送"
          onChange={(e) => (submitObject["寄送"] = e.target.value)}
        >
          <Radio.Group>
            <Radio.Button value="邮寄">邮寄</Radio.Button>
            <Radio.Button value="送货">送货</Radio.Button>
            <Radio.Button value="自取">自取</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="姓名">
          <Input
            id="name"
            onChange={(e) => (submitObject["姓名"] = e.target.value)}
          />
        </Form.Item>
        <Form.Item label="微信号">
          <Input
            id="wechatID"
            onChange={(e) => (submitObject["微信号"] = e.target.value)}
          />
        </Form.Item>
        <Form.Item label="地址">
          <Input onChange={(e) => (submitObject["地址"] = e.target.value)} />
        </Form.Item>
        <Form.Item label="邮编">
          <Input onChange={(e) => (submitObject["邮编"] = e.target.value)} />
        </Form.Item>
        <Form.Item label="电话">
          <Input onChange={(e) => (submitObject["Tel"] = e.target.value)} />
        </Form.Item>
        <Form.Item label="出单日期">
          <DatePicker
            onChange={(e) => (submitObject["日期"] = e._d.toString())}
          />
        </Form.Item>
        <Form.Item label="支付邮资">
          <InputNumber
            onChange={(e) => (submitObject["支付邮资"] = e.toString())}
          />
        </Form.Item>
        <Form.Item label="交易金额">
          <InputNumber
            onChange={(e) => (submitObject["交易金额"] = e.toString())}
          />
        </Form.Item>
        <Form.Item label="加急发货">
          <Switch
            onClick={(status, e) =>
              status == true
                ? (submitObject["加急"] = "Y")
                : (submitObject["加急"] = "N")
            }
          />
        </Form.Item>
        <Form.Item label="礼物包装">
          <Switch
            onClick={(status, e) =>
              status == true
                ? (submitObject["礼物"] = "Y")
                : (submitObject["礼物"] = "N")
            }
          />
        </Form.Item>
        <Form.Item label="Submit">
          <Button
            type="primary"
            onClick={() => newOrderSubmit(submitObject, setRefresh, productsToBeOrdered)}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewOrder;
