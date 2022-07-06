import React, { useState, useEffect, ChangeEvent, ReactElement } from "react";
import styles from "./styles.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./linked-list";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TElState = {
  value: number | string | undefined;
  state: ElementStates;
  head: "head" | ReactElement | null;
  tail: "tail" | ReactElement | null;
};

type TDefaultButtonsState = "default" | "disabled" | "isLoader";

type TButtonsState = {
  addToHead: TDefaultButtonsState;
  addToTail: TDefaultButtonsState;
  deleteFromHead: TDefaultButtonsState;
  deleteFromTail: TDefaultButtonsState;
  addByIndex: TDefaultButtonsState;
  deleteByIndex: TDefaultButtonsState;
  indexInputValue: TDefaultButtonsState;
  elInputValue: TDefaultButtonsState;
};

export const ListPage: React.FC = () => {
  const [linkedList, setLinkedList] = useState<LinkedList<number | string>>();
  const [linkedListValue, setLinkedListValue] = useState<TElState[] | null>(
    null
  );
  const [indexInputValue, setIndexInputValue] = useState('');
  const [elInputValue, setElInputValue] = useState("");
  const [arrSteps, setArrSteps] = useState<TElState[][]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const defaultButtonsState: TButtonsState = {
    addToHead: "default",
    addToTail: "default",
    deleteFromHead: "default",
    deleteFromTail: "default",
    addByIndex: "default",
    deleteByIndex: "default",
    indexInputValue: "default",
    elInputValue: "default"
  };
  const [buttonsState, setButtonsState] =
    useState<TButtonsState>(defaultButtonsState);

  useEffect(() => {
    const newLinkedList = new LinkedList<number | string>(getRandomArr());
    setLinkedList(newLinkedList);
  }, []);

  useEffect(() => {
    if (linkedList) {
      updateLinkedListValue();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedList]);

  useEffect(() => {
    if (arrSteps.length) {
      startAnim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrSteps]);

  const startAnim = () => {
    const interval = setInterval(() => {
      setCurrentStep((currentStep) => {
        const nextStep = currentStep + 1;

        if (nextStep >= arrSteps.length - 1 && interval) {
          clearInterval(interval);
          setArrSteps([]);
          setCurrentStep(0);
          setIndexInputValue("");
          setElInputValue("");

          setButtonsState(defaultButtonsState);
        }

        return nextStep;
      });
    }, SHORT_DELAY_IN_MS);
  };

  const getDefaultLinkedListValue = (arr: (number | string)[] | null) => {
    if (!arr) {
      return [];
    }
    const resArr: TElState[] = [];
    arr.forEach((el, index) => {
      resArr.push({
        value: el,
        state: ElementStates.Default,
        head: index === 0 ? "head" : null,
        tail: index === arr.length - 1 ? "tail" : null,
      });
    });
    return resArr;
  };

  const updateLinkedListValue = () => {
    setLinkedListValue(getDefaultLinkedListValue(linkedList!.toArray()));
  };

  const getRandomArr = () => {
    const randomArr: (number | string)[] = [];

    const maxValue = 9999;
    const minValue = 1;

    const minLengthArr = 3;
    const maxLengthArr = 6;

    const lengthArr = Math.floor(
      Math.random() * (maxLengthArr - minLengthArr + 1) + minLengthArr
    );

    for (let i = 0; i < lengthArr; i++) {
      const value = Math.floor(
        Math.random() * (maxValue - minValue + 1) + minValue
      );
      randomArr.push(value);
    }

    return randomArr;
  };

  const onChangeEl = (e: ChangeEvent<HTMLInputElement>) => {
    setElInputValue(e.target.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInputValue(e.target.value);
  };

  const pushElToHead = () => {
    setButtonsStateInProcess('addToHead');
    const arrSteps = [];
    const initialArr = linkedListValue!;
    if (initialArr.length) {
      initialArr[0].head = (
        <Circle
          isSmall={true}
          letter={elInputValue}
          state={ElementStates.Changing}
        />
      );
    }
    arrSteps.push(copyArr(initialArr));

    linkedList?.prepend(+elInputValue || elInputValue);
    updateLinkedListValue();

    let newArr = getDefaultLinkedListValue(linkedList!.toArray());
    if (newArr[1]) {
      newArr[1].head = null;
    }
    newArr[0].state = ElementStates.Modified;
    arrSteps.push(copyArr(newArr));

    newArr[0].state = ElementStates.Default;
    arrSteps.push(copyArr(newArr));

    newArr = getDefaultLinkedListValue(linkedList!.toArray());
    arrSteps.push(copyArr(newArr));

    setArrSteps(arrSteps);
  };

  const copyArr = (arr: TElState[]) => {
    const cloneArr: TElState[] = [];
    arr.forEach((el, index) => {
      let newEl: TElState | {} = {};
      for (let key in el) {
        //@ts-ignore
        newEl[key] = el[key];
      }
      //@ts-ignore
      cloneArr[index] = newEl;
    });
    return cloneArr;
  };

  const pushElToTail = () => {
    setButtonsStateInProcess('addToTail');
    const arrSteps = [];
    const initialArr = linkedListValue!;
    if (initialArr.length) {
      initialArr[initialArr.length - 1].head = (
        <Circle
          isSmall={true}
          letter={elInputValue}
          state={ElementStates.Changing}
        />
      );
    }
    
    arrSteps.push(copyArr(initialArr));

    linkedList?.append(+elInputValue || elInputValue);
    updateLinkedListValue();

    let newArr = getDefaultLinkedListValue(linkedList!.toArray());
    if (newArr[newArr.length - 2]) {
      newArr[newArr.length - 2].head = null;
    }
    newArr[newArr.length - 1].state = ElementStates.Modified;
    arrSteps.push(copyArr(newArr));

    newArr[newArr.length - 1].state = ElementStates.Default;
    arrSteps.push(copyArr(newArr));

    newArr = getDefaultLinkedListValue(linkedList!.toArray());
    arrSteps.push(copyArr(newArr));

    setArrSteps(arrSteps);
  };

  const deleteHead = () => {
    setButtonsStateInProcess('deleteFromHead');
    const arrSteps = [];
    const initialArr = linkedListValue!;
    initialArr[0].tail = (
      <Circle
        isSmall={true}
        letter={`${initialArr[0].value}`}
        state={ElementStates.Changing}
      />
    );
    initialArr[0].value = undefined;
    arrSteps.push(copyArr(initialArr));

    linkedList?.deleteHead();
    updateLinkedListValue();

    let newArr = getDefaultLinkedListValue(linkedList!.toArray());
    arrSteps.push(copyArr(newArr));

    setArrSteps(arrSteps);
  };

  const deleteTail = () => {
    setButtonsStateInProcess('deleteFromTail');
    const arrSteps = [];
    const initialArr = linkedListValue!;
    initialArr[initialArr.length - 1].tail = (
      <Circle
        isSmall={true}
        letter={`${initialArr[0].value}`}
        state={ElementStates.Changing}
      />
    );
    initialArr[initialArr.length - 1].value = undefined;
    arrSteps.push(copyArr(initialArr));

    linkedList?.deleteTail();
    updateLinkedListValue();

    let newArr = getDefaultLinkedListValue(linkedList!.toArray());
    arrSteps.push(copyArr(newArr));

    setArrSteps(arrSteps);
  };

  const deleteByIndex = () => {
    if (isNaN(+indexInputValue)) {
      alert('Индекс должен быть числом!')
      return
    }
    if (Number(indexInputValue) < 0 || Number(indexInputValue) > linkedListValue?.length! - 1) {
      console.log('Введите корректный индекс!')
      return
    }
    const arrSteps = [];
    const initialArr = linkedListValue!;

    linkedList?.deleteByIndex(Number(indexInputValue));
    updateLinkedListValue();

    let i = 0;
    while (i <= Number(indexInputValue)) {
      initialArr[i].state = ElementStates.Changing;
      arrSteps.push(copyArr(initialArr));

      i++;
    }

    initialArr[i - 1].state = ElementStates.Default;
    initialArr[i - 1].tail = (
      <Circle
        isSmall={true}
        letter={`${initialArr[i - 1].value}`}
        state={ElementStates.Changing}
      />
    );
    initialArr[i - 1].value = undefined;
    arrSteps.push(copyArr(initialArr));

    let newArr = getDefaultLinkedListValue(linkedList!.toArray());
    arrSteps.push(copyArr(newArr));

    setArrSteps(arrSteps);
  };

  const pushByIndex = () => {
    if (isNaN(+indexInputValue)) {
      alert('Индекс должен быть числом!')
      return
    }
    if (Number(indexInputValue) < 0 || Number(indexInputValue) > linkedListValue?.length! - 1) {
      console.log('Введите корректный индекс!')
      return
    }
    const arrSteps = [];
    const initialArr = linkedListValue!;

    linkedList?.addByIndex(+elInputValue || elInputValue, Number(indexInputValue));
    updateLinkedListValue();

    initialArr[0].head = (
      <Circle
        isSmall={true}
        letter={elInputValue}
        state={ElementStates.Changing}
      />
    )
    arrSteps.push(copyArr(initialArr));

    if (Number(indexInputValue) === 0) {
      let newArr = getDefaultLinkedListValue(linkedList!.toArray());
      newArr[Number(indexInputValue)].state = ElementStates.Modified;
      arrSteps.push(copyArr(newArr));

      newArr = getDefaultLinkedListValue(linkedList!.toArray());
      arrSteps.push(copyArr(newArr));

      setArrSteps(arrSteps);
      return;
    }
    
    initialArr[0].head = 'head';
    let i = 1;
    while (i < Number(indexInputValue)) {
      initialArr[i - 1].state = ElementStates.Changing;
      if (i - 1 !== 0) {
        initialArr[i - 1].head = null;
      }
      initialArr[i].head = (
        <Circle
          isSmall={true}
          letter={elInputValue}
          state={ElementStates.Changing}
        />
      )
      arrSteps.push(copyArr(initialArr));
      i++;
    }
    if (i - 1 !== 0) {
      initialArr[i - 1].head = null;
    }
    initialArr[i - 1].state = ElementStates.Changing;
    initialArr[i].head = (
      <Circle
        isSmall={true}
        letter={elInputValue}
        state={ElementStates.Changing}
      />
    )
    arrSteps.push(copyArr(initialArr));
    
    let newArr = getDefaultLinkedListValue(linkedList!.toArray());
    newArr[Number(indexInputValue)].state = ElementStates.Modified;
    arrSteps.push(copyArr(newArr));

    newArr = getDefaultLinkedListValue(linkedList!.toArray());
    arrSteps.push(copyArr(newArr));

    setArrSteps(arrSteps);
  };

  const setButtonsStateInProcess = (
    typeAnim:
      | "addToHead"
      | "addToTail"
      | "deleteFromHead"
      | "deleteFromTail"
      | "addByIndex"
      | "deleteByIndex"
  ) => {
    const buttonState = buttonsState;
    for (let key in buttonState) {
      if (key === typeAnim) {
        buttonState[key] = 'isLoader'
      } else {
        //@ts-ignore
        buttonState[key] = 'disabled'
      }
    }
    setCurrentStep(0);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          isLimitText={true}
          maxLength={4}
          placeholder="Введите значение"
          onChange={onChangeEl}
          value={elInputValue}
          disabled={buttonsState.elInputValue === 'disabled'}
          data-testid="elInput"
        />
        <Button
          text="Добавить в head"
          onClick={pushElToHead}
          disabled={buttonsState.addToHead === "disabled" || !elInputValue }
          isLoader={buttonsState.addToHead === "isLoader"}
          data-testid="addToHeadButton"
        />
        <Button
          text="Добавить в tail"
          onClick={pushElToTail}
          disabled={buttonsState.addToTail === "disabled" || !elInputValue}
          isLoader={buttonsState.addToTail === "isLoader"}
          data-testid="addToTailButton"
        />
        <Button
          text="Удалить из head"
          onClick={deleteHead}
          disabled={buttonsState.deleteFromHead === "disabled" || linkedListValue?.length === 0}
          isLoader={buttonsState.deleteFromHead === "isLoader"}
          data-testid="removeFromHeadButton"
        />
        <Button
          text="Удалить из tail"
          onClick={deleteTail}
          disabled={buttonsState.deleteFromTail === "disabled" || linkedListValue?.length === 0}
          isLoader={buttonsState.deleteFromTail === "isLoader"}
          data-testid="removeFromTailButton"
        />
        <Input
          placeholder="Введите индекс"
          onChange={onChangeIndex}
          value={`${indexInputValue}`}
          disabled={buttonsState.indexInputValue === 'disabled'}
          data-testid="indexInput"
        />
        <Button
          text="Добавить по индексу"
          extraClass={styles.addIndexButton}
          onClick={pushByIndex}
          disabled={buttonsState.addByIndex === "disabled" || (!elInputValue || !indexInputValue)}
          isLoader={buttonsState.addByIndex === "isLoader"}
          data-testid="addByIndexButton"
        />
        <Button
          text="Удалить по индексу"
          extraClass={styles.deleteIndexButton}
          onClick={deleteByIndex}
          disabled={buttonsState.deleteByIndex === "disabled" || !indexInputValue}
          isLoader={buttonsState.deleteByIndex === "isLoader"}
          data-testid="deleteByIndexButton"
        />
      </div>
      <div className={styles.circlesContainer}>
        {linkedListValue &&
          (arrSteps.length ? arrSteps[currentStep] : linkedListValue).map(
            (el, index) => (
              <div
                className={styles.circleContainer}
                key={`container ${index}`}
              >
                {index !== 0 ? <ArrowIcon key={`arrow ${index}`} /> : null}
                <Circle
                  letter={el.value || el.value === 0 ? `${el.value}` : undefined}
                  key={`circle ${index}`}
                  index={index}
                  head={el.head}
                  tail={el.tail}
                  state={el.state}
                />
              </div>
            )
          )}
      </div>
    </SolutionLayout>
  );
};
