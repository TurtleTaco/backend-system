import { Space } from "antd";
export default function prepareHeaders(properties) {
  return Array.prototype.map.call(properties, function (property) {
    var lowerProperty = property;
    var itemNameTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 100,
      fixed: "left",
      ellipsis: false,
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
      fixed: "left",
      ellipsis: true,
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
      width: 25,
      ellipsis: false,
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
