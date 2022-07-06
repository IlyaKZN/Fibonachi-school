import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { BLUE } from "../../constants/colors";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getBubbleSortSteps, getSelectionSortSteps } from "./utils";

export type TColumnData = {
  value: number;
  color: string;
  columnHeight: number;
};

export type TArr = TColumnData[];

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
    getNewArr();
  }, [])

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
    }, SHORT_DELAY_IN_MS);
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

  const selectionSort = (method: "ascending" | "descending") => {
    setButtonsStateInProcess(method);
    setArrSteps([]);
    setArrSteps(getSelectionSortSteps(initialArr, method));
  }

  const bubbleSort = (method: "ascending" | "descending") => {
    setButtonsStateInProcess(method);
    setArrSteps([]);
    setArrSteps(getBubbleSortSteps(initialArr, method))
  }

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
