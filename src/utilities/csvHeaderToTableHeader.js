import { Space } from "antd";

export default function prepareHeaders(properties) {
  return Array.prototype.map.call(properties, function (property) {
    var lowerProperty = property;
    var itemNameTemplate = {
      title: "property",
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 10,
      fixed: "left",
      // ellipsis: false,
      sorter: (a, b) => a["Name"].localeCompare(b["Name"]),
      sortDirections: ["ascend", "descend", "ascend"],
    };
    var sizeTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 30,
      ellipsis: true,
    };
    var priceTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 50,
      ellipsis: true,
    };
    var wechatIDTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 50,
      ellipsis: true,
      sorter: (a, b) => a["微信号"].localeCompare(b["微信号"]),
      sortDirections: ["ascend", "descend", "ascend"],
    };
    var addressTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 100,
      ellipsis: false,
    };
    var statusTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 50,
      ellipsis: false,
    };
    var postageTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 50,
      ellipsis: false,
    };
    var dateTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 50,
      ellipsis: false,
      sorter: (a, b) => a["日期"].localeCompare(b["日期"]),
      sortDirections: ["ascend", "descend", "ascend"],
    };
    var personNameTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 50,
      ellipsis: false,
      sorter: (a, b) => a["姓名"].localeCompare(b["姓名"]),
      sortDirections: ["ascend", "descend", "ascend"],
    };

    switch (property) {
      case "Name":
        return itemNameTemplate;
        break;
      case "S":
        return sizeTemplate;
        break;
      case "M":
        return sizeTemplate;
        break;
      case "L":
        return sizeTemplate;
        break;
      case "F":
        return sizeTemplate;
        break;

      case "CAD":
        return priceTemplate;
        break;

      case "微信号":
        return wechatIDTemplate;
        break;

      case "地址":
        return addressTemplate;
        break;

      case "加急":
        return statusTemplate;
        break;

      case "礼物":
        return statusTemplate;
        break;

      case "实际邮资":
        return postageTemplate;
        break;

      case "日期":
        return dateTemplate;
        break;

      case "姓名":
        return personNameTemplate;
        break;

      case "ExchangeRate":
        itemNameTemplate.render = (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        );
        return itemNameTemplate;
        break;

      default:
        return priceTemplate;
        break;
    }
  });
}
