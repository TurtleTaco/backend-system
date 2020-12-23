import OrderTable from "./orderTable";
import ProductTable from "./productTable";

export default class TableFactory {
  db;
  constructor(db){
    this.db = db;
  }

  createTable(tableName){
    switch (tableName) {
     case "orders":
     return new OrderTable(this.db.collection("orders"), this.db);
     break;
     case "products":
     return new ProductTable(this.db.collection("products"), this.db);
     break;
	}
  }

}