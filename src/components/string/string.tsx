import React, { ChangeEvent, useState, FC, useEffect } from "react";
import styles from "./styles.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { getReversingStringSteps } from "./utils";

export type TSplitString = {
  status: ElementStates,
  value: string
}[];

export const StringComponent: FC = () => {
  const [stringValue, setStringValue] = useState<string>("");
  const [splitString, setSplitString] = useState<TSplitString>([]);
  const [arrSteps, setArrSteps] = useState<TSplitString[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [reverseButtonState, setReverseButtonState] = useState<'default' | 'inProgress'>('default');

  useEffect(() => {
    if (arrSteps.length) {
      startAnim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrSteps]);

  const onChangeString = (e: ChangeEvent<HTMLInputElement>) => {
    setStringValue(e.target.value);
  };

  const onClickButton = () => {
    const splitString = stringValue.split("").map((el) => ({ status: ElementStates.Default, value: el }));
    setReverseButtonState('inProgress');
    setSplitString(splitString);
    setArrSteps(getReversingStringSteps(splitString)!);
  };

  const startAnim = () => {
    const interval = setInterval(() => {
      setCurrentStep((currentStep) => {

        if (arrSteps.length === 1) {
          setReverseButtonState('default');
          clearInterval(interval);
          return 0;
        }
        const nextStep = currentStep + 1;

        if (nextStep >= arrSteps.length - 1 && interval) {
          setReverseButtonState('default');
          clearInterval(interval);
        }

        return nextStep;
      });
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
          data-testid="input"
        />
        <Button
          text="Развернуть"
          onClick={onClickButton}
          disabled={!stringValue}
          isLoader={reverseButtonState === 'inProgress'}
          data-testid="button"
        />
      </div>
      <div className={styles.circleContainer} data-testid="circlesContainer">
        {splitString.length
          ? (arrSteps.length ? arrSteps[currentStep] : splitString).map((el, index) => (
              <Circle letter={el.value} state={el.status} key={index} />
            ))
          : null}
      </div>
    </SolutionLayout>
  );
};
