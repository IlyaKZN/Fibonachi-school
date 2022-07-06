interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getSize: () => number;
  getElements: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  getElements = (): T[] => {
    return this.container;
  };

  getSize = (): number => this.container.length;
}