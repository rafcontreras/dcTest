import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableFoot from "./TableFoot";
import useInterval from "../utils/useInterval";

const Table = ({
  tableData,
  breakFirst = false,
  padding,
  headerClassName = "",
  showPies = false
}) => {
  const { rows, headers, columns, columnTotals, entriesLength } = tableData;

  const [highlighted, setHighlighted] = useState(null);

  const loopHighlighted = () => {
    if (highlighted === null) {
      return setHighlighted(0);
    }
    if (highlighted >= entriesLength - 1) {
      return setHighlighted(0);
    }
    setHighlighted(highlighted + 1);
  };

  useInterval(loopHighlighted, 10000);

  return (
    <table className="full-width dashboardWidgetTable">
      <TableHead
        headerClassName={headerClassName}
        breakFirst={breakFirst}
        headers={headers}
      />
      <TableBody rows={rows} padding={padding} highlighted={highlighted} />
      <TableFoot
        breakFirst={breakFirst}
        headers={headers}
        footerClassName={headerClassName}
        padding={padding}
        width={120}
        highlighted={highlighted}
        columns={columns}
        columnTotals={columnTotals}
        showPies={showPies}
      />
    </table>
  );
};

export default Table;
