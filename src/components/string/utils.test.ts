import { getReversingStringSteps } from "./utils";
import {
  evenNumberElInArray,
  evenNumberElInArrayResult,
  oddNumberElInArray,
  oddNumberElInArrayResult,
  oneElInArray,
  oneElInArrayResult,
} from "./test-data";

describe("getReversingStringSteps работает корректно", () => {
  test("разворот строки с чётным количеством символов работает корректно", () => {
    expect(getReversingStringSteps(evenNumberElInArray)).toStrictEqual(
      evenNumberElInArrayResult
    );
  });
  test("разворот строки с нечётным количеством символов работает корректно", () => {
    expect(getReversingStringSteps(oddNumberElInArray)).toStrictEqual(
      oddNumberElInArrayResult
    );
  });
  test("разворот строки с одним символом работает корректно", () => {
    expect(getReversingStringSteps(oneElInArray)).toStrictEqual(
      oneElInArrayResult
    );
  });
  test("разворот пустой строки работает корректно", () => {
    expect(getReversingStringSteps([])).toStrictEqual([]);
  });
});
