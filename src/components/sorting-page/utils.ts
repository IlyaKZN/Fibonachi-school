import { TArr, TColumnData } from "./sorting-page";
import { BLUE, GREEN, VIOLET } from "../../constants/colors";

export const getBubbleSortSteps = (initialArr: TArr, method: "ascending" | "descending") => {
  const arrSteps: TArr[] = [];
  let sortableArray = copyArr(initialArr);
  const length = sortableArray.length;

  if (!initialArr.length) {
    return [[]];
  }

  if (initialArr.length === 1) {
    initialArr[0].color = GREEN;
    arrSteps.push(initialArr);
    return arrSteps;
  }

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
  return arrSteps
};

export const getSelectionSortSteps = (initialArr: TArr, method: "ascending" | "descending") => {
  
  const arrSteps: TArr[] = [];
  

  if (!initialArr.length) {
    return [[]];
  }

  if (initialArr.length === 1) {
    initialArr[0].color = GREEN;
    arrSteps.push(initialArr);
    return arrSteps;
  }

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
  return arrSteps;
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