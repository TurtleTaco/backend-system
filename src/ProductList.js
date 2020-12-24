import React, { useState } from "react";
import { Table, Tag, Space } from "antd";

export default function ProductList(props: ProductListProps) {
  const [products, setProducts] = useState(props.products);
  const [columns, setColumns] = useState(props.columns);

  return (
    <div className="ProductList">
      <Table
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
        size="small"
      ></Table>
    </div>
  );
}
