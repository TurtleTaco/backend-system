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
} from "antd";

const NewOrder = () => {
  const onFormLayoutChange = ({ size }) => {};
  const { SHOW_PARENT } = TreeSelect;

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{}}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="递送方式" name="size">
          <Radio.Group>
            <Radio.Button value="small">邮寄</Radio.Button>
            <Radio.Button value="default">送货</Radio.Button>
            <Radio.Button value="large">自取</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="姓名">
          <Input />
        </Form.Item>
        <Form.Item label="微信号">
          <Input />
        </Form.Item>
        <Form.Item label="地址">
          <Input />
        </Form.Item>
        <Form.Item label="邮编">
          <Input />
        </Form.Item>
        <Form.Item label="电话">
          <Input />
        </Form.Item>
        <Form.Item label="出单日期">
          <DatePicker />
        </Form.Item>
        <Form.Item label="支付邮资">
          <InputNumber />
        </Form.Item>
        <Form.Item label="加急发货">
          <Switch />
        </Form.Item>
        <Form.Item label="礼物包装">
          <Switch />
        </Form.Item>
        <Form.Item label="Submit">
          <Button>提交</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewOrder;
