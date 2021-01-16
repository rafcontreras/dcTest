import { useRef, useLayoutEffect } from "react";
import Tick from "@pqina/flip";

const Flipper = ({ value, tickClassName = [""] }) => {
  const divRef = useRef();
  const tickRef = useRef();

  useLayoutEffect(() => {
    const didInit = tick => {
      tickRef.current = tick;
    };

    const currDiv = divRef.current;
    const tickValue = tickRef.current;

    Tick.DOM.create(currDiv, {
      value,
      didInit
    });

    return () => Tick.DOM.destroy(tickValue);
  });

  useLayoutEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = value;
    }
  }, [value]);

  const tickClassNames = ["tick", ...tickClassName].join(" ");

  return (
    <div ref={divRef} className={tickClassNames}>
      <div data-repeat="true">
        <span data-view="flip">{value}</span>
      </div>
    </div>
  );
};

export default Flipper;
