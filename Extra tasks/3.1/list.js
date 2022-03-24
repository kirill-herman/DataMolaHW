class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class List {
  constructor(value) {
    this.root = new Node(value);
    this.lastIndex = 0;
  }

  addNode(value, i = this.lastIndex) {
    const prevNode = this._getNode(i);
    if(prevNode) {
      const newNode = new Node(value);
      newNode.next = prevNode.next;
      prevNode.next = newNode;
      this.lastIndex++;
      return true;
    }
    return false;
  }

  removeNode(i = this.lastIndex) {
    const removedNode = this._getNode(i);
    if(this.root.next && removedNode) {
      this.lastIndex--;
      if (i === 0){
        this.root = this.root.next;
        return true;
      }
      const prevNode = this._getNode(i - 1);
      prevNode.next = removedNode.next;
      return true;
    }
    return false;
  }

  print() {
    let currentNode = this.root;
    while(currentNode.next) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
    console.log(currentNode.value);
  }

  _getNode(nodeIndex) {
    let currentNode = this.root;
    for(let i = 0; i < nodeIndex; i++) {
      currentNode = currentNode.next;
      if(currentNode === null) return null;
    }
    return currentNode;
  }

}