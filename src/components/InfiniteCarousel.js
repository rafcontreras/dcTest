import { useState, useLayoutEffect } from "react";
import Slider from "react-slick";
import Widget from "./Widget";
import SlideContent from "./SlideContent";

const InfiniteCarousel = ({
  activeStore,
  slides,
  autoplaySpeed = 5000,
  showMap = false,
  onChange = () => {},
  currentSlideData,
  formattedResponseTime
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentActiveSlide, setCurrentActiveSlide] = useState(0);

  useLayoutEffect(() => {
    onChange(currentActiveSlide);
  }, [currentActiveSlide]);

  return (
    <div className="position-relative full-width full-height">
      <div className="position-absolute">
        <Slider
          adaptiveHeight={true}
          arrows={false}
          autoplay={true}
          autoplaySpeed={autoplaySpeed}
          afterChange={current => setCurrentActiveSlide(current)}
          beforeChange={(_, next) => setActiveSlide(next)}
          centerMode
          centerPadding="60px"
          className="center full-height"
          dots={false}
          draggable={false}
          infinite
          slidesToScroll={1}
          slidesToShow={1}
          speed={1000}
          swipe={false}
        >
          {slides.map(
            (
              { slideLabel, slideTitle, slideContent, slideMapData },
              slideIndex
            ) => (
              <div
                key={`${slideLabel}_${slideIndex}`}
                className={
                  slideIndex === activeSlide
                    ? "infiniteSlide activeSlide"
                    : "infiniteSlide"
                }
              >
                <Widget title={slideTitle}>
                  <SlideContent
                    activeStore={activeStore}
                    currentSlideData={currentSlideData}
                    isActive={currentActiveSlide === slideIndex}
                    showMap={showMap}
                    slideContent={slideContent}
                    slideMapData={slideMapData}
                  />
                </Widget>
              </div>
            )
          )}
        </Slider>
        <div
          style={{
            fontSize: "0.5rem",
            position: "absolute",
            bottom: "1rem",
            left: "50%",
            right: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            textAlign: "center"
          }}
        >
          Data requested {formattedResponseTime}
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;
