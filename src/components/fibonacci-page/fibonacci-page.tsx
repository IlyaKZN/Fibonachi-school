import React, { ChangeEvent, FC, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getFibonacciNumbers } from "./utils";

export const FibonacciPage: FC = () => {
  const [value, setValue] = useState("");
  const [fibonacciNumbers, setFibonacciNumbers] = useState<number[]>([]);
  const [counter, setCounter] = useState({ value: 0 });
  const [algorithmState, setAlgorithmState] = useState({ inProgress: false });
  const [startButtonisDisabled, setStartButtonisDisabled] = useState<boolean>(true);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    if (+value < 20 && +value > 0 && startButtonisDisabled) {
      setStartButtonisDisabled(false);
    } else if (!startButtonisDisabled) {
      setStartButtonisDisabled(true);
    }
  };

  const onButtonClick = (value: number) => {
    setAlgorithmState({ inProgress: true });
    setCounter({ value: 0 });
    setFibonacciNumbers(getFibonacciNumbers(Math.floor(value)));
  };

  useEffect(() => {
    if (fibonacciNumbers.length) {
      const interval = setInterval(
        () => setCounter({ value: counter.value++ }),
        SHORT_DELAY_IN_MS
      );

      if (counter.value === fibonacciNumbers.length) {
        clearInterval(interval);
        setAlgorithmState({ inProgress: false });
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [fibonacciNumbers.length, counter.value]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          value={value}
          isLimitText={true}
          type={""}
          max={19}
          onChange={(e) => onChangeValue(e as ChangeEvent<HTMLInputElement>)}
        />
        <Button
          disabled={startButtonisDisabled}
          text="Рассчитать"
          onClick={() => onButtonClick(+value)}
          isLoader={algorithmState.inProgress}
        />
      </div>
      <div className={styles.circleContainer}>
        {fibonacciNumbers.length
          ? fibonacciNumbers.map((el, index) => {
              if (index <= counter.value) {
                return <Circle letter={`${el}`} key={index} index={index} />;
              }
              return null;
            })
          : null}
      </div>
    </SolutionLayout>
  );
};
