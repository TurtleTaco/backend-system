export default class table {
  collection;
  constructor(collection){
    this.collection = collection;
  }

  add(key,entity) {
    var doc = this.collection.doc(key)
    doc.set(entity);
  }

  removeByKey(key){

    return this.collection.doc(key).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

  }

  getAll(){
    return this.collection.get();
  }

  getByKey(key){

    return this.collection.doc(key);

  }

}