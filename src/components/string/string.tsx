import React, { ChangeEvent, useState, FC } from "react";
import styles from "./styles.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

type TStringComponent = {
  splitString: { status: ElementStates, value: string }[];
  inProgress: boolean;
};

export const StringComponent: FC = () => {
  const [stringValue, setStringValue] = useState<string>("");
  const [algorithmState, setAlgorithmState] = useState<TStringComponent>({
    splitString: [],
    inProgress: false
  });

  const onChangeString = (e: ChangeEvent<HTMLInputElement>) => {
    setStringValue(e.target.value);
  };

  const onClickButton = () => {
    const splitString = stringValue.split("").map((el) => ({ status: ElementStates.Default, value: el }));
    setAlgorithmState({ ...algorithmState, splitString: splitString, inProgress: true });
    expandString(splitString);
  };

  const expandString = (
    arr = algorithmState.splitString,
    start: number = 0,
    end: number = arr.length - 1
  ) => {
    arr[start].status = ElementStates.Changing;
    arr[end].status = ElementStates.Changing;
    setAlgorithmState((prevState) => ({ ...prevState, splitString: [...arr] }));

    if (start >= end || arr.length < 2) {
      arr[start].status = ElementStates.Modified;
      setAlgorithmState((prevState) => ({ ...prevState, inProgress: false }));
      return;
    }

    setTimeout(() => {
      const temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;

      expandString(arr, start + 1, end - 1);

      arr[start].status = ElementStates.Modified;
      arr[end].status = ElementStates.Modified;
      setAlgorithmState((prevState) => ({ ...prevState, splitString: [...arr] }));
    }, DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          value={stringValue}
          isLimitText={true}
          maxLength={11}
          onChange={(e) => onChangeString(e as ChangeEvent<HTMLInputElement>)}
        />
        <Button
          text="Развернуть"
          onClick={onClickButton}
          disabled={!stringValue}
          isLoader={algorithmState.inProgress}
        />
      </div>
      <div className={styles.circleContainer}>
        {algorithmState.splitString.length
          ? algorithmState.splitString.map((el, index) => (
              <Circle letter={el.value} state={el.status} key={index} />
            ))
          : null}
      </div>
    </SolutionLayout>
  );
};
