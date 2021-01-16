import { useState } from "react";
import format from "date-fns/format";
import ms from "ms";
import Flipper from "./LazyFlipper";
import useInterval from "../utils/useInterval";

const createDate = () => {
  const now = new Date();
  const day = format(now, "dd").toUpperCase();
  const month = format(now, "MMM").toUpperCase();
  const year = format(now, "yyyy");
  return {
    day,
    month,
    year
  };
};

export default function App() {
  const [{ day, month, year }, setTodayDate] = useState(createDate());

  useInterval(() => {
    setTodayDate(createDate());
  }, ms("1s"));

  return (
    <div>
      <Flipper
        value={day}
        tickClassName={[
          "single-tick",
          "text-monospace",
          "display-inline-block"
        ]}
      />
      <span> </span>
      <Flipper
        value={month}
        tickClassName={[
          "single-tick",
          "text-monospace",
          "display-inline-block"
        ]}
      />
      <span> </span>
      <Flipper
        value={year}
        tickClassName={[
          "single-tick",
          "text-monospace",
          "display-inline-block"
        ]}
      />
    </div>
  );
}
