const numberIsInteger = num => Number.isInteger(num);

const formatNumber = (value, key, kind) => {
  const isMoneyValue = key === "value" && kind === "value";
  const isPercentage = kind === "satisfaction";
  let label = value;
  const shouldRemoveZeros = numberIsInteger(label);

  label = label.toLocaleString("en-NZ", {
    style: "currency",
    currency: "NZD"
  });

  if (!isMoneyValue) {
    label = label.replace("$", "");
    if (shouldRemoveZeros) {
      label = label.split(".")[0];
    }
    if (isPercentage) {
      label = `${label}%`;
    }
  }

  return label;
};

export default formatNumber;
