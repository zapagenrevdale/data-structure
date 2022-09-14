class BSTNode<T> {
    left: BSTNode<T> | null;
    right: BSTNode<T> | null;
    value: T;
  
    constructor(value: T, left?: BSTNode<T>, right?: BSTNode<T>) {
      this.value = value;
      this.right = right ? right : null;
      this.left = left ? left : null;
    }
  }
  
  class BinarySearchTree<T> {
    root: BSTNode<T> | null;
  
    constructor(value?: T) {
      this.root = value ? new BSTNode<T>(value) : null;
    }
  
    append(value: T): BSTNode<T> {
      const node = new BSTNode<T>(value);
  
      if (!this.root) {
        this.root = node;
        return this.root;
      }
  
      const append = (root: BSTNode<T>): BSTNode<T> => {
        if (value < root.value && root.left) {
          root = append(root.left);
        } else if (value > root.value && root.right) {
          root = append(root.right);
        } else {
          if (value < root.value) {
            root.left = node;
          } else {
            root.right = node;
          }
          return root;
        }
        return root;
      };
  
      return append(this.root);
    }
  
    search(target: T): BSTNode<T> | null {
      if (!this.root) {
        return this.root;
      }
  
      const search = (root: BSTNode<T> | null): BSTNode<T> | null => {
        if (!root) {
          return null;
        }
        if (root.value === target) {
          return root;
        }
  
        root = target < root.value ? search(root.left) : search(root.right);
  
        return root;
      };
  
      return search(this.root);
    }
  
    getMinimumNode(node: BSTNode<T>): BSTNode<T> {
      if (!node.left) {
        return node;
      }
      return this.getMinimumNode(node.left);
    }
  
    remove(target: T): BSTNode<T> | null {
      if (!this.root) {
        return this.root;
      }
  
      const remove = (root: BSTNode<T> | null, target: T): BSTNode<T> | null => {
        if (!root) {
          return null;
        }
  
        if (target < root.value) {
          root.left = remove(root.left, target);
        } else if (target > root.value) {
          root.right = remove(root.right, target);
        } else {
          if (!root.right && !root.left) {
            root = null;
          } else if (!root.right) {
            root = root.left;
          } else if (!root.left) {
            root = root.right;
          } else {
            const minimumNode = this.getMinimumNode(root.right);
            root.value = minimumNode.value;
            root.right = remove(root.right, minimumNode.value);
          }
          return root;
        }
  
        return root;
      };
  
      return remove(this.root, target);
    }
  
    preOrderTraversal(): Array<T> {
      const list = new Array<T>();
  
      const traverse = (root: BSTNode<T> | null): void => {
        if (!root) {
          return;
        }
        list.push(root.value);
        traverse(root.left);
        traverse(root.right);
      };
  
      traverse(this.root);
  
      return list;
    }
  
    postOrderTraversal(): Array<T> {
      const list = new Array<T>();
  
      const traverse = (root: BSTNode<T> | null): void => {
        if (!root) {
          return;
        }
        traverse(root.left);
        traverse(root.right);
        list.push(root.value);
      };
  
      traverse(this.root);
  
      return list;
    }
  
    inOrderTraversal(): Array<T> {
      const list = new Array<T>();
  
      const traverse = (root: BSTNode<T> | null): void => {
        if (!root) {
          return;
        }
        traverse(root.left);
        list.push(root.value);
        traverse(root.right);
      };
  
      traverse(this.root);
  
      return list;
    }
  }
  