var error = function(){
  return console.log("Each Node needs a value")
}

class Node {
  constructor(value, left=null, right=null){
    if(typeof value !== 'number') return error();

    this.value = value;
    this.left = left;
    this.right = right;
  }
}


class BinarySearchTree extends Node {
  constructor(value, left, right){
    super(value, left, right)
  }

  dispatch(direction, current, value){
    switch(direction){
      case 'LEFT':
        return current.left = current.left || new Node(value) ;
        
      case 'RIGHT':
        return current.right = current.right || new Node(value) ;
    }
  }

  insert(value){
    let current = this;

    while(true){
      if (current.value === value) break;
      current = value < current.value ? this.dispatch('LEFT', current, value) : this.dispatch('RIGHT', current, value);
    }

    return current;

  }


}

var test = new BinarySearchTree(5);
test.insert(4)
test.insert(6)
console.log(test)

