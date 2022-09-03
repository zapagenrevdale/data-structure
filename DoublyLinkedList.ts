class DoublyNode<T> {
  prev: DoublyNode<T> | null;
  next: DoublyNode<T> | null;
  value: T;

  constructor(value: T) {
    this.prev = null;
    this.next = null;
    this.value = value;
  }
}

class DoublyLinkedList<T> {
  head: DoublyNode<T> | null;
  tail: DoublyNode<T> | null;
  length: number;

  constructor(...args: Array<T>) {
    if (args.length == 0) {
      this.head = this.tail = null;
      this.length = 0;
      return;
    }

    this.head = new DoublyNode<T>(args[0]);
    let current = this.head;

    for (let i = 1; i < args.length; i++) {
      current.next = new DoublyNode<T>(args[i]);
      current.next.prev = current;
      current = current.next;
    }
    this.tail = current;
    this.length = args.length;
  }

  append(value: T) {
    const node = new DoublyNode<T>(value);
    if (this.tail) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = this.tail.next;
    } else {
      this.tail = this.head = node;
    }
    this.length++;
  }

  preppend(value: T) {
    const node = new DoublyNode<T>(value);
    if (this.head) {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    } else {
      this.tail = this.head = node;
    }
    this.length++;
  }

  traverseToIndex(index: number) {
    let currentNode = this.head;
    if (currentNode) {
      while (index > 0 && currentNode) {
        currentNode = currentNode.next;
        index--;
      }
    }
    return currentNode;
  }

  insert(index: number, value: T) {
    if (index < 0) {
      throw new Error("IndexError: Index out of bounds");
    }
    if (index == 0) {
      this.preppend(value);
      return;
    }
    if (index >= this.length) {
      this.append(value);
      return;
    }
    const behindNode = this.traverseToIndex(index - 1);
    const node = new DoublyNode<T>(value);
    if (behindNode && behindNode.next) {
      behindNode.next.prev = node;
      node.next = behindNode.next;
      behindNode.next = node;
      node.prev = behindNode;
      this.length++;
    }
  }

  popFront() {
    if (this.length == 0) {
      throw new Error("ListError: List is empty!");
    }
    let node: DoublyNode<T> | null = null;
    if (this.head) {
      node = this.head;
      this.head = this.head.next;
      if (this.head && this.head.prev) {
        this.head.prev = null;
      }
      this.length--;
    }
    if (this.length == 0) {
      this.tail = this.head;
    }
    return node;
  }

  pop() {
    if (this.length == 0) {
      throw new Error("ListError: List is empty!");
    }
    let node: DoublyNode<T> | null = null;
    if (this.tail) {
      node = this.tail.prev;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      }
      this.length--;
    }
    return node;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error("IndexError: Index out of bounds");
    }
    if (index == 0) {
      return this.popFront();
    }
    if (index == this.length - 1) {
      return this.pop();
    }

    const node = this.traverseToIndex(index);
    if (node && node.prev && node.next) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      this.length--;
    }
    return node;
  }

  toString() {
    let currNode = this.head;
    while (currNode) {
      console.log(currNode.value);
      currNode = currNode.next;
    }
  }

  reverse() {
    if (this.tail && this.head) {
      let currNode: DoublyNode<T> | null = this.tail;

      while (currNode) {
        const tempNode = currNode;
        currNode = currNode.prev;
        tempNode.prev = tempNode.next;
        tempNode.next = currNode;
      }
      [this.head, this.tail] = [this.tail, this.head];
    }
  }
}
