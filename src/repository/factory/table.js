export default class table {
  constructor(collection, db) {
    this.collection = collection;
    this.db = db;
  }

  add(entity, key = "") {
    if (key) {
      var docRef = this.collection.doc(key);
      return this.db.runTransaction(function (transaction) {
        return transaction.get(docRef).then(function (doc) {
          if (!doc.exists) {
            doc.set(entity);
          }
        });
      });
    } else {
      return this.collection.add(entity);
    }
  }

  removeByKey(key) {
    return this.collection.doc(key).delete();
  }

  getAll() {
    return this.collection.get();
  }

  getByKey(key) {
    return this.collection.doc(key);
  }

  getAllProducts() {
    let brandKey = [];
    let docDataAll = [];
    let collection = this.collection;
    let db = this.db;
    collection.get().then((returnKeys) => {
      returnKeys.forEach(function (key) {
        brandKey.push(key.id);
      });

      // for every brand key, get products
      brandKey.forEach(function (key) {
        console.log(key);
        let docRef = collection.doc(key);

        docRef.get().then((docSnapshot) => {
          console.log(docSnapshot.id);
        });
      });
    });
  }

  insertOrderObjectByKey(object, key) {
    var docRef = this.collection.doc(key);

    return this.db.runTransaction(function (transaction) {
      return transaction.get(docRef).then(function (doc) {
        if (!doc.exists) {
          throw "Document does not exist";
        }

        transaction.update(docRef, { Tracking: object["Tracking"] });
        transaction.update(docRef, { 实际邮资: object["实际邮资"] });
      });
    });
  }

  deleteOrder(object, key) {
    var docRef = this.collection.doc(key);

    return this.db.runTransaction(function (transaction) {
      return transaction.get(docRef).then(function (doc) {
        if (!doc.exists) {
          throw "Document does not exist";
        }

        transaction.delete(docRef);
      });
    });
  }

  updateOldProduct(object, key) {
    var docRef = this.collection.doc(key);

    return this.db.runTransaction(function (transaction) {
      return transaction.get(docRef).then(function (doc) {
        if (!doc.exists) {
          throw "Document does not exist";
        }

        transaction.update(docRef, { Name: object["Name"] });
        transaction.update(docRef, { S: object["S"] });
        transaction.update(docRef, { M: object["M"] });
        transaction.update(docRef, { L: object["L"] });
        transaction.update(docRef, { F: object["F"] });
        transaction.update(docRef, { CAD: object["CAD"] });
      });
    });
  }

  finishOrder(key) {
    var docRef = this.collection.doc(key);

    return this.db.runTransaction(function (transaction) {
      return transaction.get(docRef).then(function (doc) {
        if (!doc.exists) {
          throw "Document does not exist";
        }

        transaction.update(docRef, { 完成: "Y" });
      });
    });
  }
}
