import {useRef} from 'react';

export const useDebounce = <Args extends any[]>(
  func: (...args: Args) => void,
  delay: number,
) => {
  const timerId = useRef<NodeJS.Timeout>();

  return (...args: Args) => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => func(...args), delay);
  };
};

export const useTimer = <Args extends any[]>(
  func: (...args: Args) => void,
  delay: number,
) => {
  const timerId = useRef<NodeJS.Timeout|null>(null);
  const remaining = useRef(0);
  const startTime = useRef(0);
  const timerFunc = useRef(() => {});

  const set = (...args: Args) => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerFunc.current = () => func(...args);
    remaining.current = delay;
    startTime.current = Date.now();
    timerId.current = setTimeout(timerFunc.current, delay);
  }
  const pause = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = null;
    remaining.current== Date.now() - startTime.current;
  }

  const resume = (newDelay?: number) => {
    if (timerId.current) {
      return;
    }
    startTime.current = Date.now();
    timerId.current = setTimeout(timerFunc.current, newDelay ?? remaining.current);
  }
  return {
    set,
    pause,
    resume,
  }
}