import format from "date-fns/format";

const handleNewsData = ({ object, kind, method }) => {
  const news = object[kind][method].map(item => {
    item.content = item.content
      ? item.content.replace(/ *\[[^)]*\] */g, "")
      : item.description
      ? item.description
      : "";
    item.publishedAt = item.publishedAt
      ? format(new Date(item.publishedAt), "dd/MM/yyyy hh:mm a")
      : format(new Date(), "dd/MM/yyyy hh:mm a");
    return item;
  });

  return { news };
};

export default handleNewsData;
