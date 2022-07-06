export const getFibonacciNumbers = (n: number): number[] => {
  let res: number[] = [];

  const findFibonacciNumbers = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }

    if (n === 0) {
      res[n] = 1;
      return 0;
    }
    if (n === 1) {
      res[n] = 1;
      return 1;
    }

    memo[n] =  findFibonacciNumbers(n - 1, memo) +  findFibonacciNumbers(n - 2, memo);
    res[n - 1] = memo[n];
    return memo[n]
  }
  
  findFibonacciNumbers(n + 1);
  return res;
};