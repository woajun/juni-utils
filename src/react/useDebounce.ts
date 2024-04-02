import {useRef} from 'react';

export const useDebounce = <Args extends any[]>(
  func: (...args: Args) => void,
  delay: number,
) => {
  const timer = useRef<NodeJS.Timeout>();

  return (...args: Args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => func(...args), delay);
  };
};
