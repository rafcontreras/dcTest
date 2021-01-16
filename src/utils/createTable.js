import color from "color";
import { scaleOrdinal } from "@visx/scale";
import { schemeSet2 } from "d3-scale-chromatic";

const getChartColor = scaleOrdinal({
  range: schemeSet2
});

const createTable = object => {
  const entries = Object.entries(object);

  const entriesLength = entries.length;

  const rows = entries.map(([key, value], index) => {
    const strokeColor = getChartColor(index);
    const backgroundColor = color(strokeColor)
      .lighten(0.125)
      .alpha(0.25)
      .toString();
    const values = Object.entries(value).map(([keyValue, cellValue]) => ({
      cellLabel: keyValue,
      cellValue
    }));
    const row = {
      label: key,
      values,
      backgroundColor,
      strokeColor,
      originalKey: key
    };
    return row;
  });

  const headers = rows[0].values.map(value => value.cellLabel);

  const columns = headers.map(key =>
    rows.map(item => ({
      label: item.label,
      value: item.values
        .filter(value => value.cellLabel === key)
        .map(value => value.cellValue)
        .pop(),
      originalKey: key,
      strokeColor: item.strokeColor,
      backgroundColor: item.backgroundColor
    }))
  );

  const columnTotals = entries
    .map(([_, value]) => value)
    .reduce(
      (accumulator, currentValue) => (
        Object.keys(currentValue).forEach(
          key =>
            (accumulator[key] = (accumulator[key] || 0) + currentValue[key])
        ),
        accumulator
      ),
      {}
    );

  const result = {
    rows,
    headers,
    columns,
    columnTotals,
    entriesLength
  };

  return result;
};

export default createTable;
