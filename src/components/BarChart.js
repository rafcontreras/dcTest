import React, { Fragment } from "react";
import { ParentSize } from "@visx/responsive";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom } from "@visx/axis";
import { Grid } from "@visx/grid";
import { Text } from "@visx/text";

const verticalMargin = 120;
const getBarName = ({
  graphData: {
    storeData: { name }
  }
}) => name;
const getBarValue = ({ graphData: { value = 0 } }) => value;
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };

const BarChart = ({ data, margin = defaultMargin, activeStore }) => {
  return (
    <Fragment>
      <ParentSize ignoreDimensions={["height"]}>
        {({ width, height }) => {
          const xMax = width;
          const yMax = height - verticalMargin - 10;
          const xScale = scaleBand({
            range: [0, xMax],
            round: true,
            domain: data.map(getBarName),
            padding: 0.0625
          });
          const yScale = scaleLinear({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max(...data.map(getBarValue))]
          });

          return (
            <svg width={width} height={height > 10 ? height - 10 : height}>
              <Grid
                height={yMax}
                numTicksColumns={data.length}
                stroke="white"
                strokeOpacity={0.1}
                top={verticalMargin / 2}
                width={width}
                xOffset={xScale.bandwidth() / 2}
                xScale={xScale}
                yScale={yScale}
              />
              <Group top={verticalMargin / 2}>
                {data.map((item, index) => {
                  const {
                    graphData: {
                      storeData: { name },
                      value = 0,
                      backgroundColor = "#f0f",
                      strokeColor = "#0f0"
                    }
                  } = item;
                  const barWidth = xScale.bandwidth();
                  const barHeight = Math.max(yMax - (yScale(value) ?? 0), 0);
                  const barX = xScale(name);
                  const barY = yMax - barHeight;
                  const isActive = name === activeStore;
                  const fill =
                    index === 0
                      ? strokeColor
                      : isActive
                      ? strokeColor
                      : backgroundColor;
                  return (
                    <Fragment>
                      <Bar
                        key={`bar-${name}-${index}`}
                        className={isActive ? "bar bar-active" : "bar"}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={fill}
                        stroke={strokeColor}
                      />
                      <Text
                        className="barChartText text-monospace"
                        x={barX + 5}
                        y={barY - 14}
                        verticalAnchor="middle"
                        fill="white"
                      >
                        {item[item.kind]}
                      </Text>
                    </Fragment>
                  );
                })}
              </Group>
              <AxisBottom
                className="barChartText"
                numTicks={data.length}
                scale={xScale}
                top={yMax + margin.top * 1.5}
                tickLabelProps={() => ({
                  className: "barChartText text-light",
                  fill: "white",
                  textAnchor: "middle"
                })}
              />
            </svg>
          );
        }}
      </ParentSize>
    </Fragment>
  );
};

export default BarChart;
