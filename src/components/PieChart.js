import { ParentSize } from "@visx/responsive";
import Pie from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";
import AnimatedPie from "./AnimatedPie";

const PieChart = ({ data, highlighted }) => (
  <ParentSize>
    {({ width }) => {
      const radius = width / 2;
      const centerY = width / 2;
      const centerX = width / 2;
      const donutThickness = width / 4;

      return (
        <svg width={width} height={width}>
          <Group top={centerY} left={centerX}>
            <Pie
              data={data}
              pieValue={d => d.value}
              outerRadius={radius}
              innerRadius={radius - donutThickness}
              cornerRadius={3}
              padAngle={0.005}
            >
              {pie => <AnimatedPie {...pie} highlighted={highlighted} />}
            </Pie>
          </Group>
        </svg>
      );
    }}
  </ParentSize>
);

export default PieChart;
