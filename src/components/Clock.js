import { useState } from "react";
import ms from "ms";
import Flipper from "./LazyFlipper";
import useInterval from "../utils/useInterval";
import createClock from "../utils/createClock";

export default function App() {
  const [{ hours, minutes, seconds }, setClock] = useState(createClock());

  useInterval(() => {
    setClock(createClock());
  }, ms("1s"));

  return (
    <div className="text-monospace">
      <Flipper
        value={hours}
        tickClassName={[
          "single-tick",
          "text-monospace",
          "display-inline-block"
        ]}
      />
      <span>:</span>
      <Flipper
        value={minutes}
        tickClassName={[
          "single-tick",
          "text-monospace",
          "display-inline-block"
        ]}
      />
      <span>:</span>
      <Flipper
        value={seconds}
        tickClassName={[
          "single-tick",
          "text-monospace",
          "display-inline-block"
        ]}
      />
    </div>
  );
}
