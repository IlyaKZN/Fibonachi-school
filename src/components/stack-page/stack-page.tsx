import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./styles.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

type TStackValue = {
  value: string,
  state: ElementStates;
}[];

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [stack, setStack] = useState<Stack<string>>();
  const [stackValue, setStackValue] = useState<TStackValue>([]);

  useEffect(() => {
    const stack = new Stack<string>();
    setStack(stack);
  }, []);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const pushElement = () => {
    if (value) {
      stack!.push(value);
      setValue("");
      getElements({ startAnim: true });
    };
  };

  const deleteElement = () => {
    animation().then(() => {
      console.log(stackValue);
      stack!.pop();
      getElements({ startAnim: false });
    });
  };

  const cleareStack = () => {
    stack!.clear();
    getElements({ startAnim: false });
  };

  async function animation (stack: TStackValue = stackValue) {
    const length = stack.length;
    const lastEl = stack[length - 1];
    stack[length - 1] = {...lastEl, state: ElementStates.Changing}
    setStackValue([...stack]);
    await new Promise((res, rej) => setTimeout(() => {
      stack[length - 1] = {...lastEl, state: ElementStates.Default};
      setStackValue([...stack]);
      res('');
    }, 500))
  }

  const getElements = ({ startAnim }: { startAnim: boolean }) => {
    const elements = stack!.getElements();
    const elementsData: TStackValue = elements.map((el) => ({ value: el, state: ElementStates.Default }));
    setStackValue([...elementsData]);
    if (startAnim) {
      animation(elementsData);
    }
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.controlContainer}>
        <div className={styles.container}>
          <Input
            value={value}
            onChange={(e) => onChangeInput(e as ChangeEvent<HTMLInputElement>)}
            extraClass={styles.input}
            maxLength={4}
            isLimitText={true}
          />
          <Button text="Добавить" onClick={pushElement} disabled={!value} />
          <Button text="Удалить" onClick={deleteElement} disabled={!stackValue.length} />
        </div>
        <Button text="Очистить" onClick={cleareStack} disabled={!stackValue.length} />
      </div>
      <div className={styles.circlesContainer}>
        {stackValue.length
          ? stackValue.map((el, index) => (
              <Circle
                state={el.state}
                letter={el.value}
                key={index}
                index={index}
                head={index === stackValue.length - 1 ? "top" : null}
              />
            ))
          : null}
      </div>
    </SolutionLayout>
  );
};
