import color from "color";
import { scaleOrdinal } from "@visx/scale";
import { schemeSet2 } from "d3-scale-chromatic";
import createRowValue from "./createRowValue";
import filteredValues from "./filteredValues";
import stores from "./data/stores.json";

const getChartColor = scaleOrdinal({
  range: schemeSet2
});

const generateChartData = (item, index) => {
  let { value, kind } = item;
  if (kind === "value") {
    value = parseFloat(value);
  }
  const formattedValue = createRowValue({
    value,
    rowLabel: kind,
    kind
  });
  if (filteredValues.includes(kind)) {
    delete item.value;
    item[kind] = formattedValue;
  } else {
    item.value = formattedValue;
  }
  const strokeColor = getChartColor(index);
  const backgroundColor = color(strokeColor)
    .lighten(0.125)
    .alpha(0.25)
    .toString();
  const store = createRowValue({
    value: item.store,
    rowLabel: "cashiesTitle",
    kind: ""
  });

  const storeData = stores.filter(i => i.name === store).pop();

  const graphData = {
    strokeColor,
    backgroundColor,
    value,
    storeData
  };

  return {
    ...item,
    store,
    graphData
  };
};

const getValue = ({ transactions, key }) =>
  transactions.map(value => value[key]);

const getTop = ({ keys, transactions }) =>
  keys.map(key => ({
    dataLabel: key,
    dataValue: getValue({ transactions, key })
      .map((item, index) => generateChartData(item, index))
      .sort((a, b) => b.graphData.value - a.graphData.value)
  }));

const getOriginalKeys = data =>
  Object.keys(
    data.reduce((result, current) => {
      return Object.assign(result, current);
    }, {})
  );

const getRankings = ({ transactions }) => {
  if (transactions) {
    const keys = getOriginalKeys(transactions);
    return getTop({ transactions, keys });
  }
  return null;
};

export default getRankings;
