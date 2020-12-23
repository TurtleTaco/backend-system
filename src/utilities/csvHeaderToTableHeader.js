import {Space} from "antd";
export default function prepareHeaders(properties){   
    
    return Array.prototype.map.call(properties, function(property) { 

            var lowerProperty = property;
            var template = {
                title: property,
                dataIndex : lowerProperty,
                key : lowerProperty
			}

            switch (property) {
                case 'Name':
                return template;
                break;
                case 'Size':
                 return template;
                 break;
                case 'PriceCAD':
                 return template;
                 break;
                case 'DiscountedPriceCAD':
                 return template;
                 break;

                case 'PriceRMB':
                 return template;
                 break;
                
                case 'DiscountedPriceRMB':
                 return template;
                 break;
                
                case 'ExchangeRate':
                 template.render = (text, record) => (
                      <Space size="middle">
                        <a>Invite {record.name}</a>
                        <a>Delete</a>
                      </Space>
                    );
                 return template;
                 break;

                case 'Stock':
                return template;
                break;

                default:
                return template;
                break;

			}
        }) 
}
