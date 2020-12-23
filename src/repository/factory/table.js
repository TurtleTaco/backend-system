export default class table {
  constructor(collection, db){
    this.collection = collection;
    this.db = db;
  }

  add(key,entity) {
    var docRef = this.collection.doc(key);

    return this.db.runTransaction(function(transaction) {
        return transaction.get(docRef).then(function(doc) {
            if (!doc.exists) {
                doc.set(entity);
            }
            });
        });
  }

  removeByKey(key){
    return this.collection.doc(key).delete();
  }

  getAll(){
    return this.collection.get();
  }

  getByKey(key){
    return this.collection.doc(key);
  }

}