export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element : T) => void;
  addByIndex: (element: T, position: number) => void;
  getSize: () => number;
  toArray: () => T[] | null;
  deleteHead: () => void;
  deleteTail: () => void;
  deleteByIndex: (position: number) => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;
  constructor(initialArr?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (initialArr) {
      initialArr.forEach((el) => {
        this.prepend(el);
      })
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new LinkedListNode(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else if (this.head) {
        let curr = this.head;
        let currIndex = 0;

        // перебрать элементы в списке до нужной позиции
        while (currIndex + 1 < index && curr.next) {
          curr = curr.next;
          currIndex++;
        }

        let trav = curr.next;
        // добавить элемент
        curr.next = node;
        node.next = trav;
      }
      this.size++;
    }
  }

  prepend(element: T) {
    const node = new LinkedListNode(element, this.head);
    
    this.head = node;
    if (!this.tail) {
      this.tail = this.head;  
    }
    this.size++;
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    let current;

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      return
    }

    current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
    this.tail = node;
    this.size++;
  }

  toArray() {
    if (!this.head) {
      return null;
    }
    const nodes: T[] = [];
    let currentNode: LinkedListNode<T> | null = this.head;
    while (currentNode !== null) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  deleteHead() {
    if (!this.head) {
      console.log('Список пуст!')
      return
    }
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size--;
      return
    }
    this.head = this.head.next;
    this.size--;
  }

  deleteTail() {
    if (!this.head) {
      console.log('Список пуст!')
      return
    }
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size--;
      return
    }
    let currentNode: LinkedListNode<T> | null = this.head
    while (currentNode && currentNode.next !== this.tail) {
      currentNode = currentNode.next;
    }
    currentNode!.next = null;
    this.tail = currentNode;
    this.size--;
  }

  deleteByIndex(index: number) {
    if (!this.head) {
      console.log('Список пуст!')
      return
    }
    if (index === 0) {
      this.head = this.head.next;
      return
    }
    let currentNode = this.head;
    let currentIndex = 0;
    while (currentIndex < index - 1 && currentNode.next) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    currentNode.next = currentNode.next?.next || null;
    this.size--;
  }

  getSize() {
    return this.size;
  }
}