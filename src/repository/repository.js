import Factory from "./factory/tableFactory"
export default class Repository {
  orders;
  products;
  db;

  constructor(apiKey, authDomain, projectId) {
    const firebase = require("firebase");
    require("firebase/firestore");

    this.firebase = firebase.initializeApp({
        apiKey:apiKey,
        authDomain: authDomain,
        projectId: projectId
    });

    this.db = firebase.firestore();
    var factory = new Factory(this.db);

    this.orders = factory.createTable("orders");
    this.products = factory.createTable("products");
  }
}