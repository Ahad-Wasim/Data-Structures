class Node {
  constructor(value, prev=null, next=null){
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class Doubly {
  constructor(){
    this.head = null;
    this.tail = null;
  }

  insert(value){
    let node = new Node(value);

    if(!this.head){
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
  }

  removeTail(){
    let value = this.tail.value;
    this.tail = this.tail.prev;
    this.tail.next = null;
    return temp.value;
  }
}

const test = new Doubly();
test.insert(5)
test.insert(6)

console.log(test)
