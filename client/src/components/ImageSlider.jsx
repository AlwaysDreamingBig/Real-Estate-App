import { useCallback, useEffect, useRef, useState } from "react";

const slideStyles = {
  width: "100%",
  height: "500px", // Set the height of the slider
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const arrowBaseStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  fontSize: "45px",
  zIndex: 1,
  cursor: "pointer",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s ease, color 0.3s ease",
};

const rightArrowStyles = {
  ...arrowBaseStyles,
  right: "32px",
};

const leftArrowStyles = {
  ...arrowBaseStyles,
  left: "32px",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const thumbnailsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const thumbnailStyles = (isActive) => ({
  cursor: "pointer",
  border: isActive ? "2px solid blue" : "2px solid transparent",
  borderRadius: "10px",
  overflow: "hidden",
  width: "100px",
  height: "60px",
  margin: "0 5px",
});

const ImageSlider = ({ slides, autoSlide = true, showThumbnails = true }) => {
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (currentIndex !== 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

  const goToNext = useCallback(() => {
    if (currentIndex !== slides.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, slides]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex]})`,
  };

  useEffect(() => {
    if (autoSlide) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        if (currentIndex < slides.length - 1) {
          goToNext();
        }
      }, 2000);

      return () => clearTimeout(timerRef.current);
    }
  }, [goToNext, autoSlide, currentIndex, slides.length]);

  return (
    <div style={sliderStyles}>
      <div>
        <div
          onClick={goToPrevious}
          style={{
            ...leftArrowStyles,
            color: currentIndex === 0 ? 'gray' : 'blue',
            pointerEvents: currentIndex === 0 ? 'none' : 'auto',
          }}
          className="arrow"
        >
          ❰
        </div>

        <div
          onClick={goToNext}
          style={{
            ...rightArrowStyles,
            color: currentIndex === slides.length - 1 ? 'gray' : 'blue',
            pointerEvents: currentIndex === slides.length - 1 ? 'none' : 'auto',
          }}
          className="arrow"
        >
          ❱
        </div>
      </div>
      <div style={slideStylesWidthBackground} className="border-4 border-lg border-blue-600"></div>
      {showThumbnails && (
        <div style={thumbnailsContainerStyles}>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              style={thumbnailStyles(slideIndex === currentIndex)}
            >
              <img src={slide} alt={`Thumbnail ${slideIndex}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="border border-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
