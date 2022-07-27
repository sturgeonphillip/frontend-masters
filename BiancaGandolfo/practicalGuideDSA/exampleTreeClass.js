class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  insertChild(value) {
    const newTree = new Tree(value);
    this.children.push(newTree);
    return newTree;
  }
   
  // depth-first traversal
  static traverse(tree, func = console.log) {
    func(tree);
    tree.children.forEach(child => {
      Tree.traverse(child, func);
    });
  }

  contains(searchValue) {
    let result = false;
    Tree.traverse(this, (leaf) => {
      result = result || leaf.value === searchValue;
    });
    return result;
  }
  removeChild(value) {
    if (this.value === value) {
      delete this;
    }
    this.children.forEach((child, index) => {
      if (child.value === value) {
        this.children.splice(index, 1);
      } else {
        child.remove(value);
      }
    });
  }


}

// my thoughts on how to remove a value from a tree prior to seeing the solution:
// variable value to search for
// traverse to find value
// if reach root and value not found, return null
// else if a branch has the value
  // is it a leaf?
    // assign temp variable to this node
    // reassign this parent.child to be null
  // not a leaf:
    // temp variable to hold its children
    // assign temp variable to hold node
    // reassign node's children to its parent
  // once null/children are reassigned to node's parent, return temp variable to remove the node and dump it for memory to be garbage collected
  

  // note: this is not a *binary* tree
  const myTree = new Tree(1);
  myTree.insertChild(2);
  // console.log(myTree);
  myTree.insertChild(9);
  myTree.insertChild(8);
  myTree.insertChild(7);
  myTree.insertChild(4);
  myTree.insertChild(5);
  myTree.insertChild(11);

  // {
  //   value: 1,
  //   child: []
  // }
  

// everything in a tree is a tree.

console.log(myTree);
