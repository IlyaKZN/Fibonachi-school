import { TSplitString } from "./string";
import { ElementStates } from "../../types/element-states";

export const evenNumberElInArray: TSplitString = [
  { status: ElementStates.Default, value: "1" },
  { status: ElementStates.Default, value: "2" },
  { status: ElementStates.Default, value: "3" },
  { status: ElementStates.Default, value: "4" },
];

export const evenNumberElInArrayResult: TSplitString[] = [
  [
    { status: ElementStates.Changing, value: "1" },
    { status: ElementStates.Default, value: "2" },
    { status: ElementStates.Default, value: "3" },
    { status: ElementStates.Changing, value: "4" },
  ],
  [
    { status: ElementStates.Modified, value: "4" },
    { status: ElementStates.Default, value: "2" },
    { status: ElementStates.Default, value: "3" },
    { status: ElementStates.Modified, value: "1" },
  ],
  [
    { status: ElementStates.Modified, value: "4" },
    { status: ElementStates.Changing, value: "2" },
    { status: ElementStates.Changing, value: "3" },
    { status: ElementStates.Modified, value: "1" },
  ],
  [
    { status: ElementStates.Modified, value: "4" },
    { status: ElementStates.Modified, value: "3" },
    { status: ElementStates.Modified, value: "2" },
    { status: ElementStates.Modified, value: "1" },
  ],
  [
    { status: ElementStates.Modified, value: "4" },
    { status: ElementStates.Modified, value: "3" },
    { status: ElementStates.Modified, value: "2" },
    { status: ElementStates.Modified, value: "1" },
  ],
];

export const oddNumberElInArray: TSplitString = [
  { status: ElementStates.Default, value: "1" },
  { status: ElementStates.Default, value: "2" },
  { status: ElementStates.Default, value: "3" },
  { status: ElementStates.Default, value: "4" },
  { status: ElementStates.Default, value: "5" },
];

export const oddNumberElInArrayResult: TSplitString[] = [
  [
    { status: ElementStates.Changing, value: "1" },
    { status: ElementStates.Default, value: "2" },
    { status: ElementStates.Default, value: "3" },
    { status: ElementStates.Default, value: "4" },
    { status: ElementStates.Changing, value: "5" },
  ],
  [
    { status: ElementStates.Modified, value: "5" },
    { status: ElementStates.Default, value: "2" },
    { status: ElementStates.Default, value: "3" },
    { status: ElementStates.Default, value: "4" },
    { status: ElementStates.Modified, value: "1" },
  ],
  [
    { status: ElementStates.Modified, value: "5" },
    { status: ElementStates.Changing, value: "2" },
    { status: ElementStates.Default, value: "3" },
    { status: ElementStates.Changing, value: "4" },
    { status: ElementStates.Modified, value: "1" },
  ],
  [
    { status: ElementStates.Modified, value: "5" },
    { status: ElementStates.Modified, value: "4" },
    { status: ElementStates.Default, value: "3" },
    { status: ElementStates.Modified, value: "2" },
    { status: ElementStates.Modified, value: "1" },
  ],
  [
    { status: ElementStates.Modified, value: "5" },
    { status: ElementStates.Modified, value: "4" },
    { status: ElementStates.Modified, value: "3" },
    { status: ElementStates.Modified, value: "2" },
    { status: ElementStates.Modified, value: "1" },
  ],
];

export const oneElInArray: TSplitString = [
  { status: ElementStates.Default, value: "5" }
];

export const oneElInArrayResult: TSplitString[] = [[
  { status: ElementStates.Modified, value: "5" }
]];