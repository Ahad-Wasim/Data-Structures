class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value){
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
      this.tail = node;
    }  
  }

  removeHead(){
    if (!this.head) return;
    
    let temp = this.head;
    this.head = temp.next;
    return temp;
  }

  contains(target, current=this.head){

    return target === current.value ? true : current.next === null ? false : this.contains(target, current.next); 

  }

}

const test = new LinkedList()
test.insert(5)
test.insert(6)
console.log(test.contains(7));
