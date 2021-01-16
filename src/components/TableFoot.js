import PieChart from "./PieChart";
import Flipper from "./LazyFlipper";
import padValue from "../utils/padValue";
import createTitle from "../utils/createTitle";

const TableFoot = ({
  headers,
  columns,
  columnTotals,
  footerClassName = "",
  padding,
  highlighted,
  showPies,
  breakFirst
}) => {
  return (
    <tfoot>
      <tr>
        <td>
          <strong className="text-bold">Total</strong>
        </td>
        {Object.entries(columnTotals).map(([keyValue, value]) => {
          return (
            <td key={`${keyValue}`} className="text-center">
              <Flipper
                value={padValue(value, padding)}
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
      <tr className={footerClassName}>
        <th></th>
        {headers.map((header, index) => {
          const key = `header_${header}_${index}`;
          return (
            <th key={key} className="text-center">
              {createTitle(header, breakFirst)}
            </th>
          );
        })}
      </tr>
      {showPies && (
        <tr>
          <td></td>
          {columns.map((item, index) => (
            <td
              key={`chart_${item[0].originalKey}_${item.label}`}
              className="text-center"
            >
              <div className="dashboardWidgetFooterPie">
                <PieChart data={item} highlighted={highlighted} />
              </div>
            </td>
          ))}
        </tr>
      )}
    </tfoot>
  );
};

export default TableFoot;
