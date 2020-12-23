import table from "./table";
export default class ProductTable extends table	{
	constructor(collection, db) {
		super(collection, db);
	}

	incrementSmall(key){
		this.incrementStock(sizes.SMALL, key);
	};

	incrementMedium(key){
		this.incrementStock(sizes.MEDIUM, key);
	};
	
	incrementLarge(key){
		this.incrementStock(sizes.LARGE, key);
	};

	decrementSmall(key){
		this.decrementStock(sizes.SMALL, key);
	};

	decrementMedium(key){
		this.decrementStock(sizes.MEDIUM, key);
	};

	decrementLarge(key){
		this.decrementStock(sizes.LARGE, key);
	};

	incrementStock(size, key){
		var docRef = this.collection.doc(key);

		return this.db.runTransaction(function(transaction) {
			return transaction.get(docRef).then(function(doc){
				if(!doc.exists) {
					throw "Document does not exist";
				}

				switch (size) {
					case  sizes.SMALL:
						var newStock = doc.data().S + 1;
						transaction.update(docRef, {S : newStock});
					break;
					case  sizes.MEDIUM:
						var newStock = doc.data().M + 1;
						transaction.update(docRef, {M : newStock});
					break;
					case  sizes.LARGE:
						var newStock = doc.data().L + 1;
						transaction.update(docRef, {L : newStock});
					break;
				}
			});
		});
	};

	decrementStock(size, key){
		var docRef = this.collection.doc(key);

		return this.db.runTransaction(function(transaction) {
			return transaction.get(docRef).then(function(doc){
				if(!doc.exists) {
					throw "Document does not exist";
				}

				var updateObject;
				switch (size) {
					case  sizes.SMALL:
						var newStock = doc.data().S - 1;
						updateObject  = {S : newStock};
					
					break;
					case  sizes.MEDIUM:
						var newStock = doc.data().M - 1;
						updateObject = {M : newStock};
					break;
					case  sizes.LARGE:
						var newStock = doc.data().L - 1;
						updateObject = {L : newStock};
					break;
				}
				
				if(newStock < 0) {
					throw "The stock size is already 0"
				}

				transaction.update(docRef, updateObject);
			});
		});
	};
}

const sizes = {
		SMALL : "small",
		MEDIUM: "median",
		LARGE: "large",
		OTHER: "other"
	};