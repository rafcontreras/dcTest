import { Fragment } from "react";
import camelToSentenceCase from "../utils/camelToSentenceCase";

const AnimatedPie = ({ arcs, path, highlighted }) => {
  return (
    <Fragment>
      {arcs.map((arc, index) => {
        const {
          data: { strokeColor, backgroundColor, value, label }
        } = arc;
        const isHighlighted = index === null || index === highlighted;
        const scaleFactor = isHighlighted ? 0.99 : 0.9;
        const [centroidX, centroidY] = path.centroid(arc);
        const title = camelToSentenceCase(label);
        return (
          <g key={index} className={value === 0 ? "hidden" : ""}>
            <path
              className={highlighted ? "animated-grow" : ""}
              d={path({
                ...arc
              })}
              stroke={strokeColor}
              fill={backgroundColor}
              style={{
                transformOrigin: "0 0",
                transform: `scale(${scaleFactor}, ${scaleFactor})`
              }}
            />
            {isHighlighted && (
              <g className="pieLegend">
                <text
                  className="pieLegendValue"
                  x={centroidX}
                  y={centroidY}
                  dy="0"
                  fill="#fff"
                  fontSize={18}
                  textAnchor="middle"
                >
                  {value}
                </text>
                <text
                  className="pieLegendLabel"
                  x={centroidX}
                  y={centroidY}
                  dy=".5rem"
                  fill="#fff"
                  fontSize={18}
                  textAnchor="middle"
                >
                  {title}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </Fragment>
  );
};

export default AnimatedPie;
