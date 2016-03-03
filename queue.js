'use strict';

class Queue {
  constructor(){
    this.storage = {};
    this.oldest = 0;
    this.newest = 0;
  }

  getList(){
    return this.storage;
  }

  enqueue(value){
    return this.storage[this.newest++] = value;
  }

  dequeue(){
    if(this.oldest !== this.newest){
      let cache = this.storage[this.oldest];
      delete this.storage[this.oldest++]
      return cache;   
    }
    return 'Finished';
  }
 
}

const test = new Queue();
test.enqueue('Ahad')
test.enqueue('Bob');
console.log(test.getList());
test.dequeue();
console.log(test.getList());
test.dequeue();
console.log(test.getList());
console.log(test.dequeue());






