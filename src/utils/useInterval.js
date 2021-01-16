import { useLayoutEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
