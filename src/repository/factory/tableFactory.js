import Table from "./table";
export default class TableFactory {
  db;
  constructor(db) {
    this.db = db;
  }
  createTable(tableName) {
    switch (tableName) {
      case "orders":
        return new Table(this.db.collection("orders"));
        break;
      case "products":
        return new Table(this.db.collection("products"));
        break;
    }
  }
}
