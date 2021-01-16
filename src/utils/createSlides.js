import createRowValue from "./createRowValue";
import filteredValues from "./filteredValues";

const filteredLabels = ["graphData", "kind"];

const createRow = (label, value, kind) => {
  const isValue = filteredValues.includes(kind);
  const rowLabel = createRowValue({
    value: isValue ? label : value,
    rowLabel: "cashiesTitle",
    kind: ""
  });

  return {
    rowLabel,
    rowValue: value
  };
};

const createSlideRows = dataValue =>
  dataValue.map(item => {
    const rows = Object.entries(item)
      .filter(([_, value]) => value !== undefined)
      .filter(([label]) => !filteredLabels.includes(label))
      .map(([label, value]) => createRow(label, value, item.kind));
    const storeName = rows
      .filter(row => row.rowLabel === "Store")
      .map(row => row.rowValue)
      .pop();

    return { rows, storeName };
  });

const createSlideMapData = dataValue =>
  dataValue
    .map(item =>
      Object.entries(item)
        .filter(([_, value]) => value !== undefined)
        .filter(([label]) => label === "graphData")
        .map(([_, value]) => value)
    )
    .flat();

const createSlide = item => {
  const { dataLabel, dataValue } = item;
  const slideLabel = item.dataLabel;
  const slideTitle = createRowValue({
    value: dataLabel,
    rowLabel: "cashiesTitle",
    kind: ""
  });
  const slideMapData = createSlideMapData(dataValue);
  const slideContent = createSlideRows(dataValue).map(item => {
    const { storeName } = item;
    item.storeInfo = slideMapData
      .filter(row => row.storeData.name === storeName)
      .flat()
      .pop();
    delete item.storeName;
    return item;
  });

  return {
    slideLabel,
    slideTitle,
    slideContent,
    slideMapData
  };
};

const createSlides = (data, top = 0) =>
  data
    .map(item => {
      if (top > 0) {
        const { dataValue } = item;
        item.dataValue = dataValue.slice(0, top);
      }
      return item;
    })
    .map(createSlide);

export default createSlides;
