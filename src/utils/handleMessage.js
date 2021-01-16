import handleTransactionsData from "./handleTransactionsData";
import handleNewsData from "./handleNewsData";
import handleForecastData from "./handleForecastData";

const knownMethods = [
  "news",
  "forecast",
  "hourlyLoans",
  "latestLoanApplications"
];

const unchangedDataMethods = ["hourlyLoans", "latestLoanApplications"];

const handleMessage = ({
  object,
  options = null,
  kind = null,
  method = null
}) => {
  const responseTime = new Date();
  let message = {
    kind,
    responseTime,
    method
  };
  if (object && object[kind]) {
    if (object[kind].transactions) {
      message = {
        ...message,
        ...handleTransactionsData({ object, kind, options })
      };
    }
    if (
      knownMethods.includes(method) &&
      object[kind][method] &&
      object[kind][method].length > 0
    ) {
      message.kind = method;

      if (unchangedDataMethods.includes(method)) {
        message[method] = object[kind][method];
      }

      if (method === "news") {
        message = { ...message, ...handleNewsData({ object, kind, method }) };
      }
      if (method === "forecast") {
        message = {
          ...message,
          ...handleForecastData({ object, kind, method, options })
        };
      }
    }
  }

  return JSON.stringify(message);
};

export default handleMessage;
