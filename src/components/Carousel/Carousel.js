import React, { useEffect, useState } from 'react';
import Slide from './Slide/Slide';
import './Carousel.scss';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideList, setSlideList] = useState([]);

  const onClickPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? slideList.length - 1 : currentIndex - 1
    );
  };

  const onClickNext = () => {
    setCurrentIndex(
      currentIndex === slideList.length - 1 ? 0 : currentIndex + 1
    );
  };

  useEffect(() => {
    fetch('/data/carousel.json')
      .then(result => result.json())
      .then(data => setSlideList(data));
  }, []);

  return (
    <div className="carousel">
      <ul
        className="slide-list"
        style={{
          transform: `translateX(${
            (-100 / slideList.length) * (0.5 + currentIndex)
          }%)`,
        }}
      >
        {slideList.map(slide => (
          <li key={slide.id}>
            <Slide slide={slide} />
          </li>
        ))}
      </ul>
      <button onClick={onClickPrevious}>
        <img alt="<" src="images/main_arr_prev.png" />
      </button>
      <button onClick={onClickNext}>
        <img alt=">" src="images/main_arr_next.png" />
      </button>
    </div>
  );
};
export default Carousel;
