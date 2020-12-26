import { Space } from "antd";
export default function prepareRows(headers, rows) {
  return Array.prototype.map.call(properties, function (property) {
    var lowerProperty = property.toLowerCase();
    var template = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
    };

    const productNameActionField = ({}) => {
      return (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      );
    };
    var productName = {
      title: property,
      dataIndex: lowerProperty,
      key: lowerProperty,
      render: productNameActionField,
    };

    switch (property) {
      case "品名":
        return productName;
        break;
      case "Name":
        return template;
        break;
      case "Size":
        return template;
        break;
      case "PriceCAD":
        return template;
        break;
      case "DiscountedPriceCAD":
        return template;
        break;

      case "PriceRMB":
        return template;
        break;

      case "DiscountedPriceRMB":
        return template;
        break;

      case "ExchangeRate":
        template.render = (text, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        );
        return template;
        break;

      case "Stock":
        return template;
        break;
    }
  });
}
