import { Space } from "antd";
export default function prepareHeaders(properties) {
  return Array.prototype.map.call(properties, function (property) {
    var lowerProperty = property;
    var nameTemplate = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      width: 100,
      fixed: "left",
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

    switch (property) {
      case "Name":
        return nameTemplate;
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

      case "ExchangeRate":
        nameTemplate.render = (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        );
        return nameTemplate;
        break;

      default:
        return priceTemplate;
        break;
    }
  });
}
