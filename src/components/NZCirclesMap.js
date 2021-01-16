import { Fragment } from "react";
import nzMapCircles from "../utils/data/nzMapCircles.json";

const PulseCircle = ({ position: { cx, cy, color = null } }) => (
  <Fragment>
    <circle
      cx={cx}
      cy={cy}
      r="20"
      fill="none"
      stroke={color || "hsl(43, 87%, 50%)"}
      strokeWidth="8"
    >
      <animate
        attributeName="r"
        begin="0s"
        dur="1.5s"
        from="8"
        repeatCount="indefinite"
        to="40"
      ></animate>
      <animate
        attributeName="opacity"
        begin="0s"
        dur="1.5s"
        from="1"
        repeatCount="indefinite"
        to="20"
      ></animate>
    </circle>
    <circle cx={cx} cy={cy} r="15" fill={color || "hsl(43, 87%, 50%)"} />
  </Fragment>
);

const NZCirclesMap = ({ storeNames = [] }) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 1450 1955"
    xmlSpace="preserve"
  >
    {nzMapCircles.map(({ cx, cy }) => (
      <circle
        key={`circle_${cx}_${cy}`}
        cx={cx}
        cy={cy}
        r="10"
        fill="hsl(240, 2%, 30%)"
      />
    ))}
    {nzMapCircles.map(({ cx, cy, stores }) =>
      stores
        .filter(store => storeNames.map(item => item.storeName).includes(store))
        .map(store => (
          <PulseCircle
            key={`circle_${cx}_${cy}_${store}`}
            position={{
              cx,
              cy,
              color: storeNames
                .filter(item => item?.storeName === store)
                .map(item => item?.color)
                .pop()
            }}
          />
        ))
    )}
  </svg>
);

export default NZCirclesMap;
