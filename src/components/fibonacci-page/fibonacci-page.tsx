import React, { ChangeEvent, FC, useState, useEffect } from "react";
import styles from './styles.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: FC = () => {

  const [value, setValue] = useState('');
  const [fibonacciNumbers, setFibonacciNumbers] = useState<number[]>([]);
  const [counter, setCounter] = useState({value: 0});
  const [algorithmState, setAlgorithmState] = useState({ inProgress: false });

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onButtonClick = (value: number) => {
    setAlgorithmState({ inProgress: true });
    setCounter({ value: 0 });
    setFibonacciNumbers(getFibonacciNumbers(Math.floor(value)));
  };

  const getFibonacciNumbers = (n: number): number[] => {
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

  useEffect(() => {

    if(fibonacciNumbers.length) {
      const interval = setInterval(() => setCounter({ value: counter.value++ }), 500);

      if(counter.value === fibonacciNumbers.length) {
        clearInterval(interval);
        setAlgorithmState({ inProgress: false });
      }

      return (() => {
        clearInterval(interval);
      })
    }

  }, [fibonacciNumbers.length, counter.value]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input value={value} isLimitText={true} type={''} max={19} onChange={(e) => onChangeValue(e as ChangeEvent<HTMLInputElement>)} />
        <Button disabled={Number(value) < 20 && Number(value) > 0 ? false : true} text="Рассчитать" onClick={() => onButtonClick(Number(value))} isLoader={algorithmState.inProgress} />
      </div>
      <div className={styles.circleContainer}>
        {fibonacciNumbers.length ? fibonacciNumbers.map((el, index) => {
          if (index <= counter.value) {
            return <Circle letter={`${el}`} key={index} index={index} />
          }
          return null
        }) : null}
      </div>
    </SolutionLayout>
  );
};