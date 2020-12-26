import React, { useState } from "react";
import { Table, Tag, Space, Menu, Dropdown, Input, Button } from "antd";

//////////////////// Detailed toBeShipped View ////////////////////
import TobeShippedDetail from "./TobeShippedDetail";
import InTransitDetail from "./InTransitDetail";

//////////////////// Detailed product view ////////////////////////
export default function ProductList(props: ProductListProps) {
  const [products, setProducts] = useState(props.products);
  const [columns, setColumns] = useState(props.columns);
  const [rowContent, setRowContent] = useState({});

  let type = props.listType.toString();
  const { Column, ColumnGroup } = Table;

  // console.log(products);

  const addToCart = (optionClickEvent, productID, productName) => {
    // eg. [essential, a23909sud0afsj, S]
    var orderDetail = [
      productName,
      productID,
      optionClickEvent.target.innerHTML.charAt(0),
    ];
    console.log(orderDetail);
    props.appendToCartProducts(orderDetail);
  };

  const currentProductDropdownSelectMenu = (sizeSelectionRange) => {
    // console.log(sizeSelectionRange);
    var sizeNumberCntOption = [];
    const productID = sizeSelectionRange["ID"];
    const productName = sizeSelectionRange["Name"];

    ["S", "M", "L", "F"].forEach((size) => {
      if (sizeSelectionRange[size] != "0") {
        var numAvailable = sizeSelectionRange[size];
        sizeNumberCntOption.push(size + ": " + numAvailable);
      }
    });
    // console.log(sizeNumberCntOption);
    // above return: ProductList.js:33 (4) ["S: 1", "M: 1", "L: 1", "F: 1"]

    ///////////////////////////////////////////
    // Note: below sizeNumberCntOption.forEach does not work
    // Only sizeNumberCntOption.map work, reason?
    ///////////////////////////////////////////

    return (
      <Menu>
        {sizeNumberCntOption.map((option) => (
          <Menu.Item>
            <a
              onClick={(e) =>
                // click on one of the product size number option
                addToCart(e, productID, productName)
              }
            >
              {option}
            </a>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <div>
      <div className="ProductList">
        {type == "inventory" ? (
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  // console.log(record);
                  setRowContent(record);
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
            // columns={[
            //   {
            //     title: "Name",
            //     dataIndex: "Name",
            //     // sorter: {
            //     //   compare: (a, b) => a.Name.length - b.Name.length,
            //     // },
            //   },
            //   {
            //     title: "S",
            //     dataIndex: "S",
            //     sorter: {
            //       compare: (a, b) => a.S - b.S,
            //     },
            //   },
            //   {
            //     title: "M",
            //     dataIndex: "M",
            //     sorter: {
            //       compare: (a, b) => a.M - b.M,
            //     },
            //   },
            //   {
            //     title: "L",
            //     dataIndex: "L",
            //     sorter: {
            //       compare: (a, b) => a.L - b.L,
            //     },
            //   },
            //   {
            //     title: "F",
            //     dataIndex: "F",
            //     sorter: {
            //       compare: (a, b) => a.F - b.F,
            //     },
            //   },
            //   {
            //     title: "CAD",
            //     dataIndex: "CAD",
            //     sorter: {
            //       compare: (a, b) => a.CAD - b.CAD,
            //     },
            //   },
            //   {
            //     title: "RMB",
            //     dataIndex: "RMB",
            //   },
            //   {
            //     title: "九折",
            //     dataIndex: "九折",
            //   },
            // ]}
            dataSource={products}
            pagination={{ pageSize: 50 }}
            // scroll={{ y: 240 }}
            size="small"
            style={{ minHeight: "90%", padding: "0px 24px 0px 24px" }}
          >
            <Column
              title="Name"
              key="action"
              dataIndex="Name"
              render={(text, record) => (
                <Space size="middle">
                  <Dropdown
                    overlay={() => currentProductDropdownSelectMenu(record)}
                  >
                    <a
                      onClick={() => {
                        // click on the product name
                        console.log(record.Name);
                      }}
                    >
                      {record.Name}
                    </a>
                  </Dropdown>
                </Space>
              )}
              sorter={(a, b) => {
                console.log(a["Name"] + "   " + b["Name"]);
                console.log(a["Name"].localeCompare(b["Name"]));
                a["Name"].localeCompare(b["Name"]);
              }}
            />

            {["S", "M", "L", "F", "CAD", "10%", "RMB", "九折"].map(
              (catagory) => (
                <Column
                  title={catagory}
                  dataIndex={catagory}
                  sorter={(a, b) => {
                    // console.log(a["S"]);
                    a[catagory].localeCompare(b[catagory]);
                  }}
                />
              )
            )}
          </Table>
        ) : (
          <Table
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  // console.log(record);
                  setRowContent(record);
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
            columns={columns}
            dataSource={products}
            pagination={{ pageSize: 50 }}
            // scroll={{ y: 240 }}
            size="small"
            style={{ minHeight: "90%", padding: "0px 24px 0px 24px" }}
          ></Table>
        )}
      </div>
      {type == "toBeShipped" ? (
        <TobeShippedDetail
          test={rowContent}
          sideMenuSetRefresh={props.sideMenuSetRefresh}
        />
      ) : null}
      {type == "inTransit" ? (
        <InTransitDetail
          test={rowContent}
          sideMenuSetRefresh={props.sideMenuSetRefresh}
        />
      ) : null}
    </div>
  );
}
