import React, { useState } from "react";
import { Table, Tag, Space } from "antd";

//////////////////// Detailed toBeShipped View ////////////////////
import TobeShippedDetail from "./TobeShippedDetail";
import InTransitDetail from "./InTransitDetail";

//////////////////// Detailed product view ////////////////////////

export default function ProductList(props: ProductListProps) {
  const [products, setProducts] = useState(props.products);
  const [columns, setColumns] = useState(props.columns);
  const [rowContent, setRowContent] = useState({});

  let type = props.listType.toString();

  return (
    <div>
      <div className="ProductList">
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
          style={{ minHeight: "90%" }}
        ></Table>
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
