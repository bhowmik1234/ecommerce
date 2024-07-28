import React, { useState, useEffect } from 'react';

interface SliderProps {
  images: string[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="slider-section">
      {images.map((image, index) => (
        <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <div className="arrow prev" onClick={prevSlide}>&#10094;</div>
      <div className="arrow next" onClick={nextSlide}>&#10095;</div>
      <div className="dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Slider;