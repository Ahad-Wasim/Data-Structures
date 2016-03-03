"use strict";

const log = value => console.log(value);

class Stack {
  constructor(){
    this.storage = {};
    this.size = 0;
  }

  getList(){
    return this.storage;
  }

  push(value){
    return this.storage[this.size++] = value
  }

  pop(){
    return this.size !== 0 ? delete this.storage[this.size--] : 'Collection is empty'; 
  }
}

