import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { BLUE, GREEN, VIOLET } from "../../constants/colors";
import { DELAY_IN_MS } from "../../constants/delays";

type TColumnData = {
  value: number;
  color: string;
  columnHeight: number;
};

type TArr = TColumnData[];

type TDefaultButtonsState = "default" | "disabled" | "isLoader";

type TButtonsState = {
  selectionSort: boolean;
  bubbleSort: boolean;
  ascending: TDefaultButtonsState;
  descending: TDefaultButtonsState;
  newArr: TDefaultButtonsState;
};

export const SortingPage: React.FC = () => {
  const [initialArr, setInitialArr] = useState<TArr>([]);
  const [arrSteps, setArrSteps] = useState<TArr[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const defaultButtonsState: TButtonsState = {
    selectionSort: true,
    bubbleSort: false,
    ascending: "default",
    descending: "default",
    newArr: "default",
  };
  const [buttonsState, setButtonsState] =
    useState<TButtonsState>(defaultButtonsState);

  useEffect(() => {
    if (arrSteps.length) {
      startAnim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrSteps]);

  const toggleRadioButton = (value: string) => {
    switch (value) {
      case "Выбор":
        setButtonsState({
          ...buttonsState,
          selectionSort: true,
          bubbleSort: false,
        });
        break;
      case "Пузырёк":
        setButtonsState({
          ...buttonsState,
          selectionSort: false,
          bubbleSort: true,
        });
        break;
    }
  };

  const startAnim = () => {
    const interval = setInterval(() => {
      setCurrentStep((currentStep) => {
        const nextStep = currentStep + 1;

        if (nextStep >= arrSteps.length - 1 && interval) {
          clearInterval(interval);
          setButtonsState((prevState) => {
            return {
              ...defaultButtonsState,
              selectionSort: prevState.selectionSort,
              bubbleSort: prevState.bubbleSort,
            };
          });
        }

        return nextStep;
      });
    }, DELAY_IN_MS);
  };

  const getNewArr = () => {
    setArrSteps([]);
    setCurrentStep(0);

    const resArr = [];

    const maxValue = 100;
    const minValue = 1;

    const minLengthArr = 3;
    const maxLengthArr = 17;

    const lengthArr = Math.floor(
      Math.random() * (maxLengthArr - minLengthArr + 1) + minLengthArr
    );

    for (let i = 0; i < lengthArr; i++) {
      const value = Math.floor(
        Math.random() * (maxValue - minValue + 1) + minValue
      );
      resArr.push({
        value: value,
        color: BLUE,
        columnHeight: (340 * value) / 100,
      });
    }

    setInitialArr(resArr);
  };

  const swap = (arr: TArr, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const copyArr = (arr: TArr) => {
    const cloneArr: TArr = [];
    arr.forEach((el, index) => {
      let newEl: TColumnData | {} = {};
      for (let key in el) {
        //@ts-ignore
        newEl[key] = el[key];
      }
      //@ts-ignore
      cloneArr[index] = newEl;
    });
    return cloneArr;
  };

  const setButtonsStateInProcess = (method: "ascending" | "descending") => {
    if (method === "ascending") {
      setButtonsState({
        ...buttonsState,
        ascending: "isLoader",
        descending: "disabled",
        newArr: "disabled",
      });
    } else {
      setButtonsState({
        ...buttonsState,
        ascending: "disabled",
        descending: "isLoader",
        newArr: "disabled",
      });
    }
    setCurrentStep(0);
  };

  const bubbleSort = (method: "ascending" | "descending") => {
    setButtonsStateInProcess(method);
    const arrSteps: TArr[] = [];
    setArrSteps([]);
    let sortableArray = copyArr(initialArr);
    const length = sortableArray.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (sortableArray[j - 1]) {
          sortableArray[j - 1].color = BLUE;
        }
        sortableArray[j].color = VIOLET;
        sortableArray[j + 1].color = VIOLET;
        arrSteps.push(copyArr(sortableArray));
        if (method === "ascending") {
          if (sortableArray[j + 1].value < sortableArray[j].value) {
            swap(sortableArray, j, j + 1);
          }
        } else {
          if (sortableArray[j + 1].value > sortableArray[j].value) {
            swap(sortableArray, j, j + 1);
          }
        }
        if (j === length - i - 2) {
          sortableArray[j + 1].color = GREEN;
          sortableArray[j].color = BLUE;
          arrSteps.push(copyArr(sortableArray));
        }
        if (j === 0) {
          sortableArray[j].color = GREEN;
          arrSteps.push(copyArr(sortableArray));
        }
      }
    }
    setArrSteps([...arrSteps]);
  };

  const selectionSort = (method: "ascending" | "descending") => {
    setButtonsStateInProcess(method);
    const arrSteps: TArr[] = [];
    arrSteps.push(copyArr(initialArr));
    let sortableArray = copyArr(initialArr);
    const length = sortableArray.length;
    const cycle = (i: number) => {
      if (i < length) {
        let maxInd = i;
        sortableArray[i].color = VIOLET;
        arrSteps.push(copyArr(sortableArray));

        const findMax = (j: number) => {
          if (j < length) {
            sortableArray[j].color = VIOLET;
            arrSteps.push(copyArr(sortableArray));

            if (method === "ascending") {
              if (sortableArray[j].value < sortableArray[maxInd].value) {
                maxInd = j;
              }
            } else {
              if (sortableArray[j].value > sortableArray[maxInd].value) {
                maxInd = j;
              }
            }
            if (i !== j) {
              sortableArray[j].color = BLUE;
              arrSteps.push(copyArr(sortableArray));
            }

            findMax(j + 1);
          }
        };

        findMax(i);
        if (maxInd !== i) {
          swap(sortableArray, maxInd, i);
          sortableArray[i].color = GREEN;
          sortableArray[maxInd].color = BLUE;
          arrSteps.push(copyArr(sortableArray));
        } else {
          sortableArray[maxInd].color = GREEN;
          arrSteps.push(copyArr(sortableArray));
        }

        cycle(i + 1);
      }
    };
    cycle(0);
    setArrSteps([...arrSteps]);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.radioButtonsContainer}>
          <RadioInput
            onChange={() => toggleRadioButton("Выбор")}
            label="Выбор"
            name="sortMethod"
            value="Выбор"
            checked={buttonsState.selectionSort}
          />
          <RadioInput
            onChange={() => toggleRadioButton("Пузырёк")}
            label="Пузырёк"
            name="sortMethod"
            value="Пузырёк"
            checked={buttonsState.bubbleSort}
          />
        </div>
        <div className={styles.methodButtonsContainer}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={
              buttonsState.selectionSort
                ? () => selectionSort("ascending")
                : () => bubbleSort("ascending")
            }
            disabled={buttonsState.ascending === "disabled" || !initialArr.length}
            isLoader={buttonsState.ascending === "isLoader"}
            extraClass={styles.ascendingButton}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={
              buttonsState.selectionSort
                ? () => selectionSort("descending")
                : () => bubbleSort("descending")
            }
            disabled={buttonsState.descending === "disabled" || !initialArr.length}
            isLoader={buttonsState.descending === "isLoader"}
            extraClass={styles.descendingButton}
          />
        </div>
        <Button
          onClick={getNewArr}
          text="Новый массив"
          extraClass={styles.newArrayButton}
          disabled={buttonsState.newArr === "disabled"}
          isLoader={buttonsState.newArr === "isLoader"}
        />
      </div>
      <div className={styles.columnsContainer}>
        {(arrSteps.length ? arrSteps[currentStep] : initialArr).map(
          (el, index) => (
            <div key={index}>
              <div
                style={{
                  height: el.columnHeight,
                  width: 50,
                  backgroundColor: el.color,
                }}
              ></div>
              <p className={styles.columnDescription}>{el.value}</p>
            </div>
          )
        )}
      </div>
    </SolutionLayout>
  );
};
