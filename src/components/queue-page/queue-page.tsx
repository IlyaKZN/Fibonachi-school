import React, { ChangeEvent, useState, useEffect } from "react";
import styles from './styles.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {

  const [value, setValue] = useState("");
  const [queue, setQueue] = useState<Queue<string>>();
  const [queueValue, setQueueValue] = useState<(string | null)[]>([]);
  const [endIndices, setEndIndices] = useState<{ headIndex: number, tailIndex: number }>();
  const [indexChangingEl, setIndexChangingEl] = useState<number | null>(null);
  const queueSize = 7;

  useEffect(() => {
    const queue = new Queue<string>(queueSize);
    setQueue(queue);
    setInitialQueueState();
  }, []);

  const setInitialQueueState = () => {
    setQueueValue(Array(queueSize));
    setEndIndices({ headIndex: -1, tailIndex: -1 })
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addEl = () => {
    setValue('');
    animation(queue!.getNewElIndex()).then(() => {
      queue!.enqueue(value);
      getElements();
      getIndexes();
    });
  };

  const deleteEl = () => {
    if (queue?.isEmpty()) {
      return
    }
    animation(endIndices!.headIndex).then(() => {
      queue!.dequeue();
      getElements();
      getIndexes();
    });
  };

  const clearQueue = () => {
    queue!.clear();
    setInitialQueueState();
  };

  const getElements = () => {
    const elements = queue!.getElements();
    setQueueValue([...elements]);
  };

  const getIndexes = () => {
    const tailIndex = queue!.getTailIndex();
    const headIndex = queue!.getHeadIndex();
    setEndIndices({ headIndex: headIndex!, tailIndex: tailIndex });
  };

  async function animation (indexEl: number) {
    setIndexChangingEl(indexEl);
    await new Promise((res, rej) => setTimeout(() => {
      setIndexChangingEl(null);
      res('');
    }, SHORT_DELAY_IN_MS))
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.controlContainer}>
        <div className={styles.container}>
          <Input
            value={value}
            onChange={(e) => onChangeInput(e as ChangeEvent<HTMLInputElement>)}
            extraClass={styles.input}
            maxLength={4}
            isLimitText={true}
          />
          <Button text="Добавить" disabled={!value} onClick={addEl} />
          <Button text="Удалить" onClick={deleteEl} />
        </div>
        <Button text="Очистить" onClick={clearQueue} />
      </div>
      <div className={styles.circlesContainer}>
        {function() {
          let content = [];
          for (let i = 0; i < queueValue.length; i++) {
            content.push(
              <Circle
                key={i}
                index={i}
                letter={queueValue[i] || undefined}
                head={i === endIndices?.headIndex ? 'head' : null}
                tail={i === endIndices?.tailIndex ? 'tail' : null}
                state={i === indexChangingEl ? ElementStates.Changing : ElementStates.Default}
              />
            )
          }
          return content;
        }()}
      </div>
    </SolutionLayout>
  );
};
