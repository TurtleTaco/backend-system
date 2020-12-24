import React, { useState } from "react";
import { Table, Tag, Space } from "antd";

export default function ProductList(props: ProductListProps) {
  const [products, setProducts] = useState(props.products);
  const [columns, setColumns] = useState(props.columns);

  return (
    <div className="ProductList">
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {}, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
        size="small"
      ></Table>
    </div>
  );
}
