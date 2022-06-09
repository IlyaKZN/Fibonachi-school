import React, { useState } from "react";
import styles from './styles.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {

  const [arr, setArr] = useState<{ value: number, color: string, columnHeight: number }[]>([]);

  const randomArr = () => {
    const resArr = [];

    const maxValue = 100;
    const minValue = 1;

    const minLengthArr = 3;
    const maxLengthArr = 17;

    const lengthArr = Math.floor(Math.random() * (maxLengthArr - minLengthArr + 1) + minLengthArr);

    for (let i = 0; i < lengthArr; i++) {
      const value = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue)
      resArr.push({
        value: value, 
        color: '#0032FF', 
        columnHeight: (340 * value) / 100
      })
    }

    setArr(resArr);
  };

  const swap = (arr: { value: number, color: string, columnHeight: number }[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  async function sort () {
    const sortableArray = arr;
    const length = sortableArray.length;
    async function cycle (i: number) {
      if (i < length) {
        let maxInd = i;

        //@ts-ignore
        async function findMax (j: number) {

          await new Promise(resolve => {
            setTimeout(() => {
              console.log(j)
              if (j < length) {
                
                if (sortableArray[j].value < sortableArray[maxInd].value) {
                  maxInd = j;
                }
                
                findMax(j + 1);
                
              }
            }, 200);
          });
        }

        let res = await findMax(i);

        console.log(res)
        
        if (maxInd !== i) {
          swap(sortableArray, maxInd, i)
        }
        // cycle(i + 1);

      }
      setArr([...sortableArray]);
      
    }
    cycle(0);
  }

  // const sort1 = () => {
  //   const sortableArray = arr;
  //   function externalDelay (i: number) {
  //     if (i < sortableArray.length) {
  //       sortableArray[i].color = '#D252E1';
  //       // setTimeout(function() {
  //         console.log('Внешний :',sortableArray)
  //         function internalDelay (j: number) {
  //           if (j < sortableArray.length) {
  //             setTimeout(function() {
  //               console.log('Внутренний :', sortableArray)

  //               if (sortableArray[i].value > sortableArray[j].value) {
  //                 swap(sortableArray, i, j)
  //               }
  //               internalDelay(j + 1);
  //               setArr([...sortableArray]);
  //               if (j === sortableArray.length - 1) {
  //                 externalDelay(i + 1);
  //               }
  //             }, 500)
  //           }
  //         }
          
  //         internalDelay(0);
          
          
  //       // },500)
  //     }
  //   }
  //   externalDelay(0);
  //   console.log(sortableArray)
  //   setArr([...sortableArray]);
  // };

  // const sort = () => {
  //   const sortableArray = arr;
  //   for (let i = 0; i < sortableArray.length; i++) {
  //     setTimeout(() => {
  //       function internalDelay (j: number) {
  //         if (j < sortableArray.length) {
  //           setTimeout(function() {
  //             if (sortableArray[i].value > sortableArray[j].value) {
  //               swap(sortableArray, i, j)
  //             }
  //             internalDelay(j + 1);
  //             setArr([...sortableArray]);
  //           }, 500)
  //         }
  //       }
  //       internalDelay(0)
  //     }, 1000)
  //   }
  //   console.log(sortableArray)
  //   setArr([...sortableArray]);
  // };
  

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.radioButtonsContainer}>
          <RadioInput label="Выбор" name="sortMethod" value='Выбор' />
          <RadioInput label="Пузырёк" name="sortMethod" value='Пузырёк' />
        </div>
        <div className={styles.methodButtonsContainer}>
          <Button text="По возрастанию" sorting={Direction.Ascending} onClick={sort} />
          <Button text="По убыванию" sorting={Direction.Descending} />
        </div>
        <Button onClick={randomArr} text="Новый массив" extraClass={styles.newArrayButton} />
      </div>
      <div className={styles.columnsContainer}>
      {arr.map((el, index) => ( 
        <div key={index}>
          <div  style={{height: el.columnHeight, width: 50, backgroundColor: el.color}}></div>
          <p className={styles.columnDescription}>{el.value}</p>
        </div>
      ))}
      </div>
    </SolutionLayout>
  );
};