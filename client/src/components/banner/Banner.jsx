import React, { useState, useEffect } from "react";
import s from "./Banner.module.css";
import imgOne from "../../assets/imgOne.png";
import imgTwo from "../../assets/imgTwo.png";
import imgThree from "../../assets/imgThree.png";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = window.innerWidth <= 768; // Consideramos un ancho menor o igual a 768px como un dispositivo móvil
  const images = isMobile ? [img1, img2, img3] : [imgOne, imgTwo, imgThree];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={s.banner}>
      <div className={s.slider}>
        <img src={images[currentSlide]} alt="Slide" className={s.slideImage} />
        <button className={s.prevButton} onClick={handlePrevSlide}>
          &lt;
        </button>
        <button className={s.nextButton} onClick={handleNextSlide}>
          &gt;
        </button>
      </div>
      <div className={s.navigation}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${s.dot} ${currentSlide === index ? s.activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
