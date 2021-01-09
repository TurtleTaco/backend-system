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

async function newOrderSubmit(object, sideMenuSetRefresh, selectedProducts) {
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

  var productRefsAndSizes = selectedProducts.map(function (selectedProduct) {
    return [selectedProduct.ID, selectedProduct.size];
  });

  var newOrderCreatedPromise = repo.runTransaction(async function (
    transaction
  ) {
    var newOrderRef = await repo.orders.add({});

    console.log(productRefsAndSizes);
    var refsAndParams = productRefsAndSizes.map(async function (
      productRefAndSize
    ) {
      var productRef = repo.products.getByKey(productRefAndSize[0]);
      var product = await transaction.get(productRef);

      var updateParam;
      switch (productRefAndSize[1]) {
        case "S":
          updateParam = { S: product.data().S - 1 };
          break;
        case "M":
          updateParam = { M: product.data().M - 1 };
          break;
        case "L":
          updateParam = { L: product.data().L - 1 };
          break;
        case "F":
          updateParam = { F: product.data().F - 1 };
          break;
      }

      return [productRef, updateParam];
    });

    for (var index in refsAndParams) {
      var refAndParam = await refsAndParams[index];
      console.log(refAndParam);
      transaction.update(refAndParam[0], refAndParam[1]);
    }

    transaction.set(newOrderRef, object);
  });

  newOrderCreatedPromise
    .then(function () {
      sideMenuSetRefresh(true);
      message.info("New Order Submitted");
    })
    .catch(function (e) {
      throw e;
    });
}

const NewOrder = (setRefresh, cartProducts, setCartProducts) => {
  const CAD2RMB = 5.1;

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
    包含物件: "",
  });

  // cart products display
  const [selectionType, setSelectionType] = useState("checkbox");

  // which products are being selected
  var [productsToBeOrdered, setProductsToBeOrdered] = useState([]);

  // total selected goods cost
  var [totalSelectedPrice, setTotalSelectedPrice] = useState(0);

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
      title: "Price CAD",
      dataIndex: "CAD",
    },
    {
      title: "10% Off",
      dataIndex: "CAD_10_off",
    },
    {
      title: "RMB",
      dataIndex: "RMB",
    },
    {
      title: "九折",
      dataIndex: "RMB_10_off",
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
      // 2: "S"
      // 3: "180"
      cartData.push({
        key: tableRowKey.toString(),
        product: singleProduct[0],
        size: singleProduct[2],
        ID: singleProduct[1],
        CAD: singleProduct[3],
        CAD_10_off: (parseInt(singleProduct[3]) * 0.9).toFixed(2).toString(),
        RMB: (parseInt(singleProduct[3]) * CAD2RMB).toFixed(2).toString(),
        RMB_10_off: (parseInt(singleProduct[3]) * CAD2RMB * 0.9)
          .toFixed(2)
          .toString(),
      });
      tableRowKey++;
    });

    cartData.push({
      key: tableRowKey.toString(),
      product: "Total Price",
      size: "",
      ID: "",
      CAD: totalSelectedPrice,
      CAD_10_off: (totalSelectedPrice * 0.9).toFixed(2).toString(),
      RMB: (totalSelectedPrice * CAD2RMB).toFixed(2).toString(),
      RMB_10_off: (totalSelectedPrice * CAD2RMB * 0.9).toFixed(2).toString(),
    });

    // console.log(cartData);
    return cartData;
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setProductsToBeOrdered(selectedRows);

      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );

      // calculate total value of to be ordered goods, set in state
      var totalValueCAD = 0;
      selectedRows.map(function (selectedRow) {
        // console.log(selectedRow);
        totalValueCAD += parseInt(selectedRow["CAD"]);
      });
      setTotalSelectedPrice(totalValueCAD);
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
            size="small"
            style={{ padding: "0px 24px 0px 24px" }}
            scroll={{ x: 800 }}
          />
        </div>

        <div
          style={{ marginTop: "25px", marginLeft: "20px", marginRight: "20px" }}
        >
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
              onClick={async () => {
                submitObject["包含物件"] = JSON.stringify(
                  productsToBeOrdered.map(function (product) {
                    return [product.product, product.size];
                  })
                );

                await newOrderSubmit(
                  submitObject,
                  setRefresh,
                  productsToBeOrdered
                );
                productsToBeOrdered.forEach(function (product) {
                  cartProducts.splice(cartProducts.indexOf(product), 1);
                });
                setCartProducts(cartProducts);
              }}
            >
              提交
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default NewOrder;
