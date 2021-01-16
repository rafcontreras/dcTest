import { Fragment } from "react";
import camelToSentenceCase from "./camelToSentenceCase";

const createTitle = (key, breakFirst) => {
  let title = camelToSentenceCase(key);
  if (key === "total") {
    return <strong className="text-bold">{title}</strong>;
  }
  if (breakFirst) {
    const wordArray = title.split(" ").filter(word => word !== "");
    if (wordArray.length > 0) {
      const firstItem = wordArray[0];
      const restItems = wordArray.slice(1).join(" ");
      title = (
        <Fragment>
          {firstItem}
          <br />
          {restItems}
        </Fragment>
      );
    }
  }

  return title;
};

export default createTitle;
