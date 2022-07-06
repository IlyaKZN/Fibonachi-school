import { TSplitString } from "./string";
import { ElementStates } from "../../types/element-states";

export const getReversingStringSteps = (splitString: TSplitString | []): TSplitString[] | null => {
  const arrSteps:TSplitString[] = [];

  const expandString = (
    arr = copyArr(splitString),
    start: number = 0,
    end: number = arr.length - 1
  ) => {

    if (!splitString.length) {
      return arrSteps;
    }

    if (start >= end || arr.length < 2) {
      arr[start].status = ElementStates.Modified;
      arrSteps.push(copyArr(arr));
      return arrSteps;
    }

    arr[start].status = ElementStates.Changing;
    arr[end].status = ElementStates.Changing;
    arrSteps.push(copyArr(arr));

    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    arr[start].status = ElementStates.Modified;
    arr[end].status = ElementStates.Modified;
    arrSteps.push(copyArr(arr));

    expandString(arr, start + 1, end - 1);
  };
  expandString();

  return arrSteps;
}

const copyArr = (arr: TSplitString) => {
  const cloneArr: TSplitString = [];
  arr.forEach((el, index) => {
    let newEl: TSplitString | {} = {};
    for (let key in el) {
      //@ts-ignore
      newEl[key] = el[key];
    }
    //@ts-ignore
    cloneArr[index] = newEl;
  });
  return cloneArr;
};