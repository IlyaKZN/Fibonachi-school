interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getHeadIndex: () => number;
  getTailIndex: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    if (this.tail === this.size) {
      this.tail = 0;
    }
    if (this.head === this.size - 1) {
      return
    }

    this.container[this.getNewElIndex()] = item;
    if (this.length !== 0) {
      this.tail++;   
    }
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    delete this.container[this.head];
    this.length--;
    if (!this.isEmpty()) {
      this.head++;
    }
  };

  clear = () => {
    this.container.fill(null);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  isEmpty = () => this.length === 0;

  getNewElIndex = (): number => {
    if (this.length !== 0) {
      return this.tail + 1
    } else {
      return this.tail
    }
  }

  getElements = (): (T | null)[] => {
    return this.container;
  };

  getHeadIndex = (): number => {
    if (this.isEmpty()) {
      return this.head;
    }
    return this.head % this.size;
  };

  getTailIndex = (): number => {
    if (this.isEmpty()) {
      return -1;
    }
    return this.tail % this.size;
  };
}