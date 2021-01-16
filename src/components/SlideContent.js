import { useState, useEffect, Fragment } from "react";
import NZCirclesMap from "./NZCirclesMap";
import useInterval from "../utils/useInterval";

const SlideContent = ({ showMap, isActive, slideContent, slideMapData }) => {
  const [shouldStartCounter, setShouldStartCounter] = useState(false);
  const [activeStore, setActiveStore] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [newSlideContent, setNewSlideContent] = useState([]);
  const isMultiple = slideContent.length > 1;
  const allowedRowsInMultiple = ["Store", "Pawns", "Value", "Satisfaction"];

  const counter = () => {
    const length = newSlideContent.map(({ rows }) => rows)?.flat()?.length;
    let newActiveIndex = activeIndex + 1;

    if (length && shouldStartCounter) {
      if (newActiveIndex > length) {
        return setActiveIndex(0);
      }
      setActiveIndex(newActiveIndex);

      const newActiveStore = isMultiple
        ? newSlideContent
            .filter((_, index) => index === activeIndex)
            .map(item => ({
              storeName: item?.storeInfo?.storeData?.name,
              color: item?.storeInfo?.strokeColor
            }))
        : newSlideContent.map(item => ({
            storeName: item?.storeInfo?.storeData?.name,
            color: item?.storeInfo?.strokeColor
          }));

      setActiveStore(newActiveStore);
    }
  };

  const setSlideContent = () => {
    const slide = isMultiple
      ? slideContent.map(({ rows, storeInfo }) => {
          rows = [
            {
              rowLabel: "",
              rowValue: rows
                .filter(row => allowedRowsInMultiple.includes(row.rowLabel))
                .map(row => row.rowValue)
            }
          ];
          return { rows, storeInfo };
        })
      : slideContent;

    setNewSlideContent(slide);
  };

  useInterval(() => {
    counter();
  }, 2000);

  useEffect(() => {
    setShouldStartCounter(false);
    setSlideContent();

    if (isActive) {
      setActiveIndex(0);
      setShouldStartCounter(true);
      counter();
    }
  }, [isActive]);

  return (
    <div className="grid grid-col-2-1">
      <div className="definitionList">
        {newSlideContent?.length > 0 &&
          newSlideContent.map(
            (
              {
                rows,
                storeInfo: {
                  backgroundColor,
                  strokeColor,
                  storeData: { name }
                }
              },
              mainIndex
            ) => (
              <Fragment key={`mainRow_${name}_${mainIndex}`}>
                {rows.map(({ rowLabel, rowValue }, rowIndex) => {
                  const rowPosition = (rowIndex + 1) * (mainIndex + 1);
                  return (
                    <div
                      key={`row_${rowLabel}_${rowIndex}`}
                      className="definitionItem"
                      style={{
                        backgroundColor:
                          activeIndex === rowPosition && isActive
                            ? backgroundColor
                            : "transparent"
                      }}
                    >
                      <div className="definitionLabel">{rowLabel}</div>
                      <div className="definitionValue">
                        {rowLabel === "Store" && (
                          <span
                            className="roundLabel"
                            style={{ backgroundColor: strokeColor }}
                          />
                        )}
                        {isMultiple ? (
                          <div className="rowMultiple">
                            {rowValue.map((item, index) => (
                              <span
                                key={`${index}_multiple`}
                                className={index === 1 ? "text-monospace" : ""}
                              >
                                {index === 0 && (
                                  <span
                                    className="roundLabelRanking text-monospace"
                                    style={{ backgroundColor: strokeColor }}
                                  >
                                    {rowPosition}
                                  </span>
                                )}
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span
                            className={
                              rowLabel === "Pawns" || rowLabel === "Value"
                                ? "text-monospace"
                                : ""
                            }
                          >
                            {rowValue}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </Fragment>
            )
          )}
      </div>
      {showMap && slideMapData?.length > 0 && (
        <NZCirclesMap storeNames={activeStore} />
      )}
    </div>
  );
};

export default SlideContent;
