import createTitle from "./createTitle";
import formatNumber from "./formatNumber";
import filteredValues from "./filteredValues";

const createRowValue = ({ value, rowLabel, kind }) => {
  const isNumber = filteredValues.includes(rowLabel);
  const isCashies =
    rowLabel === "store" || rowLabel === "agent" || rowLabel === "cashiesTitle";
  if (isNumber) {
    return formatNumber(value, rowLabel, kind);
  }
  if (isCashies) {
    return createTitle(value, false).replace(/ +(?= )/g, "");
  }
  return value;
};

export default createRowValue;
