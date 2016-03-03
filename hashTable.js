var helpers = {

  hashValue:function(str, max){
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash<<5) + hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }
    return hash % max;
  },

  collisionReducer: function(checkCollision, bucket, action, origTuple, i, key, value){
    switch(action){
      case 'REMOVE':
        return checkCollision ? helpers.delete.call(this, bucket, i) : null;
      case 'INSERT':
        return checkCollision ? helpers.overwrite.call(this, origTuple, value) : helpers.addTuple.call(this, bucket, key, value);
      case 'RETRIEVE':
        return checkCollision ? helpers.retrieve.call(this, origTuple) : null;
      default:
        throw new Error('Please use this hashing function appropriately')
    }
  },
  grabBucket: function(index){
    return this.storage[index] = this.storage[index] || [];
  },

  checkCollision:function(bucket, action, key, value){
    for(let i = 0;i<bucket.length;i++){
      let tuple = bucket[i]
      if(tuple[0] === key){
        return helpers.collisionReducer.call(this, true, bucket, action, tuple, i, key, value )
      }
    }
    return helpers.collisionReducer.call(this, false, bucket, action, null, null, key, value )  
  },

  addTuple:function(bucket, key, value){
    let newValue = bucket.push([key,value])
  

    if( this.storageLimit * .75 <= ++this.size ){
      helpers.resize.call(this, this.storageLimit * 2)
      return newValue;  
    } else {
      return newValue;
    }
    
  },

  overwrite: function(tuple, value){
    let temp = tuple[1];
    tuple[1] = value;
    return temp;
  },

  delete:function(bucket, index){
    let deleteValue = bucket.splice(index, 1);
    
    if(--this.size <= this.storageLimit * .25){
      helpers.resize.call(this, this.storageLimit / 2)
      return deleteValue;  
    } else {
      return deleteValue;
    }
  },

  retrieve: function(tuple){
    return tuple[1];
  },

  resize(newValue){

    var pairs = [];
    for(let i = 0; i<this.storage.length;i++){
      let bucket = this.storage[i];
      if(!bucket) continue
      for(let j = 0;j<bucket.length;j++){
        pairs.push(bucket[j]);
      }
    }
    this.storageLimit = newValue;
    this.size=0;
    this.storage = [];

    for(let i = 0; i<pairs.length;i++){
      this.insert(pairs[i][0], pairs[i][1])
    }
  }

}


class HashTable {
  constructor(){
    this.storage = [];
    this.storageLimit = 4;
    this.size = 0;
  }

  sendAction(action, key, value=null){
    let index = helpers.hashValue(key, this.storageLimit);
    let bucket = helpers.grabBucket.call(this, index);
    return helpers.checkCollision.call(this, bucket, action, key, value);
  }

  insert(key, value){
    return this.sendAction('INSERT', key, value)
  }

  retrieve(key){
    return this.sendAction('RETRIEVE', key)
  }

  remove(key){
    return this.sendAction('REMOVE', key)
  }

  returnLimit(){
    return this.storageLimit;
  }
  returnStorage(){
    return this.storage;
  }

}



