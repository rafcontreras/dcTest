import Flipper from "./LazyFlipper";
import camelToSentenceCase from "../utils/camelToSentenceCase";
import padValue from "../utils/padValue";

const TableBody = ({ rows, padding, highlighted }) => {
  return (
    <tbody>
      {rows.map(({ label, values, backgroundColor, strokeColor }, index) => {
        const isHighlighted = index === highlighted;
        return (
          <tr
            key={`row_${label}`}
            style={{
              backgroundColor: isHighlighted ? backgroundColor : "transparent"
            }}
          >
            <td style={{ fontSize: "0.6125rem" }}>
              <span
                className="roundLabel"
                style={{
                  backgroundColor: strokeColor
                }}
              />
              {camelToSentenceCase(label)}
            </td>
            {values.map(({ cellLabel, cellValue }) => {
              return (
                <td
                  key={`cell_${cellLabel}_${cellValue}`}
                  className="text-center"
                >
                  <Flipper
                    value={padValue(cellValue, padding)}
                    tickClassName={[
                      "single-tick",
                      "text-monospace",
                      "display-inline-block"
                    ]}
                  />
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
