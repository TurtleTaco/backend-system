import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./SideMenu.css";

const { SubMenu } = Menu;

function handleClick() {
  console.log("click ");
}

export default function SideMenu() {
  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <SubMenu key="sub1" icon={<MailOutlined />} title="库存">
        <Menu.Item key="1">多伦多现货</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="出单">
        <Menu.Item key="2">待邮寄</Menu.Item>
        <Menu.Item key="3">在途</Menu.Item>
        <Menu.Item key="4">完成</Menu.Item>
        <Menu.Item key="5">邮资记录</Menu.Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="入库">
        <Menu.Item key="6">空运</Menu.Item>
        <Menu.Item key="7">海运</Menu.Item>
        <Menu.Item key="8">入库记录</Menu.Item>
      </SubMenu>
    </Menu>
  );
}
