import { Fragment, useEffect, useState } from "react";
import formatDistance from "date-fns/formatDistance";
import { observer, inject } from "mobx-react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSection from "../components/DashboardSection";
import DashboardFooter from "../components/DashboardFooter";
import LazyCarousel from "../components/LazyCarousel";
import LazyBarChart from "../components/LazyBarChart";
import useInterval from "../utils/useInterval";

const SlideAndChart = inject("store")(
  observer(
    ({ store, store: { loaded }, method, top = 1, title = "Dashboard" }) => {
      const slides = store?.dashboardData?.[method]?.slides || [];
      const sorted = store?.dashboardData?.[method]?.sorted || [];
      const responseTime = store?.dashboardData?.[method]?.responseTime || "";
      const [currentActiveSlide, setCurrentActiveSlide] = useState(0);
      const [currentSlideData, setCurrenSlideData] = useState(null);
      const [shouldStartCounter, setShouldStartCounter] = useState(false);
      const [activeIndex, setActiveIndex] = useState(null);
      const [formattedResponseTime, setFormattedResponseTime] = useState("");
      const highlightTime = 500;

      const slideData = () => {
        const data = sorted[currentActiveSlide];
        if (data !== undefined) {
          const dataValue = Object.values(data).pop();
          return dataValue;
        }
        return null;
      };

      const onChange = slide => {
        setCurrentActiveSlide(slide);
      };

      const counter = () => {
        const length = currentSlideData?.length;

        if (length && shouldStartCounter && activeIndex >= 0 && loaded) {
          if (activeIndex % 2) {
            const dataValidity = formatDistance(
              new Date(responseTime),
              new Date(),
              {
                addSuffix: true
              }
            );
            setFormattedResponseTime(dataValidity);
          }
          let newActiveIndex = activeIndex + 1;
          if (newActiveIndex === length) {
            setShouldStartCounter(false);
          } else {
            setActiveIndex(newActiveIndex);
          }
        }
      };

      const getData = () => store.getDashboardData(method, top);

      useEffect(() => {
        setShouldStartCounter(false);
        setTimeout(() => {
          setActiveIndex(0);
          setShouldStartCounter(true);
        }, 2000);
      }, [currentSlideData]);

      useEffect(() => {
        setCurrenSlideData(slideData());
      }, [sorted, currentActiveSlide]);

      useEffect(() => {
        getData();
      }, []);

      useInterval(() => {
        counter();
      }, highlightTime);

      const render =
        slides?.length > 0 && sorted?.length > 0 && currentSlideData;
      const activeStore = render ? currentSlideData[activeIndex]?.store : "";

      return (
        <Fragment>
          <DashboardHeader title={title} />
          <DashboardSection>
            {render && (
              <div className="grid grid-row-2-1 full-height">
                <div className="grid grid-col-3-6-3 full-height">
                  <div />
                  <LazyCarousel
                    currentSlideData={currentSlideData}
                    activeStore={activeStore}
                    slides={slides}
                    showMap={true}
                    onChange={onChange}
                    autoplaySpeed={
                      currentSlideData?.length * highlightTime + 2000
                    }
                    formattedResponseTime={formattedResponseTime}
                  />
                </div>
                <div style={{ padding: "0 1rem" }}>
                  <LazyBarChart
                    data={currentSlideData}
                    activeStore={activeStore}
                  />
                </div>
              </div>
            )}
          </DashboardSection>
          <DashboardFooter />
        </Fragment>
      );
    }
  )
);

export default SlideAndChart;
