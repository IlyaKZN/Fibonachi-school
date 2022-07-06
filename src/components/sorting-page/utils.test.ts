import { getBubbleSortSteps, getSelectionSortSteps } from "./utils";
import {
  testArray,
  testArrayBubbleResult,
  testArrayWithOneEl,
  testArrayWithOneElResult,
  testArraySelectionResult,
} from "./test-data";

describe("Сортировка массива работает корректно", () => {
  describe("Сортировка пузырьком работает корректно", () => {
    test("Сортировка массива из нескольких элементов работает корректно", () => {
      expect(getBubbleSortSteps(testArray, "ascending")).toStrictEqual(
        testArrayBubbleResult
      );
    });

    test("Сортировка массива из одного элемента работает корректно", () => {
      expect(getBubbleSortSteps(testArrayWithOneEl, "ascending")).toStrictEqual(
        testArrayWithOneElResult
      );
    });

    test("Сортировка пустого массива работает корректно", () => {
      expect(getBubbleSortSteps([], "ascending")).toStrictEqual([[]]);
    });
  });

  describe("Сортировка выбором работает корректно", () => {
    test("Сортировка массива из нескольких элементов работает корректно", () => {
      expect(getSelectionSortSteps(testArray, "ascending")).toStrictEqual(
        testArraySelectionResult
      );
    });

    test("Сортировка массива из одного элемента работает корректно", () => {
      expect(
        getSelectionSortSteps(testArrayWithOneEl, "ascending")
      ).toStrictEqual(testArrayWithOneElResult);
    });

    test("Сортировка пустого массива работает корректно", () => {
      expect(getSelectionSortSteps([], "ascending")).toStrictEqual([[]]);
    });
  });
});
