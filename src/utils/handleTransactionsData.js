import createSlides from "./createSlides";
import getRankings from "./getRankings";

const handleTransactionsData = ({ object, kind, options }) => {
  const { transactions } = object[kind];
  const sorted = getRankings({ transactions });
  const saved = JSON.stringify(sorted);
  const slides = createSlides(JSON.parse(saved), options);

  return { sorted, slides };
};

export default handleTransactionsData;
