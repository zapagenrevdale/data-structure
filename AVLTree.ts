class AVLNode<T> {
  left: AVLNode<T> | null;
  right: AVLNode<T> | null;
  value: T;

  constructor(value: T, left?: AVLNode<T>, right?: AVLNode<T>) {
    this.value = value;
    this.right = right ? right : null;
    this.left = left ? left : null;
  }
}

class AVLTree<T> {
  root: AVLNode<T> | null;

  constructor(...args: Array<T>) {
    this.root = null;
    if (args) {
      args.map((value) => this.append(value));
    }
  }

  append(value: T) {
    const node = new AVLNode<T>(value);
    if (this.root == null) {
      this.root = node;
      return;
    }
    this.avlRecursiveAppend(this.root, node);
  }

  avlRecursiveAppend(node: AVLNode<T>, newNode: AVLNode<T>) {
    if (newNode.value >= node.value) {
      if (node.right == null) {
        node.right = newNode;
        return;
      }
      this.avlRecursiveAppend(node.right, newNode);
    } else {
      if (node.left == null) {
        node.left = newNode;
        return;
      }
      this.avlRecursiveAppend(node.left, newNode);
    }
  }
}

const avltree = new AVLTree(4, 5, 23, 45, 1, 4, 0, 2);

console.log(avltree.root);
