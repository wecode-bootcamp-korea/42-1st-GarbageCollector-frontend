import React, { useEffect, useState } from 'react';
import './Carousel.scss';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideList, setSlideList] = useState([]);
  const [action, setAction] = useState(true);
  const [isTransition, setIsTransition] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(() => {
    fetch('data/carousel.json')
      .then(response => response.json())
      .then(data => {
        setDataFromServer(data);
        setSlideList(data);

        setSlideList(prev => [data[data.length - 1], ...prev, data[0]]);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex(currentIndex + 1), 4000);
    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setIsTransition(false);
    }, 1000);

    const startIndex = 0;
    currentIndex === startIndex &&
      setTimeout(() => {
        setAction(0);
        setCurrentIndex(3);
        setTimeout(() => {
          setAction(1);
        }, 20);
      }, 1000);
    currentIndex === slideList.length - 1 &&
      setTimeout(() => {
        setAction(0);
        setCurrentIndex(1);
        setTimeout(() => {
          setAction(1);
        }, 20);
      }, 1000);
    return () => {};
  }, [currentIndex, slideList.length]);

  const clickHandler = ({ target }) => {
    setCurrentIndex(Number(target.innerText));
  };

  const onClickButton = ({ target }) => {
    if (isTransition) return;
    setAction(1);
    target.className === 'previous'
      ? setCurrentIndex(curIndex => {
          setIsTransition(true);
          return currentIndex - 1;
        })
      : setCurrentIndex(curIndex => {
          setIsTransition(true);
          return curIndex + 1;
        });
  };

  return (
    <div className="carousel">
      <ul
        className="slide-list"
        style={{
          width: `${100 * slideList.length - 1}vw`,
          transform: `translateX(${-100 * currentIndex}vw)`,
          transition: `all ${action}s`,
        }}
      >
        {slideList.map((slide, idx) => (
          <img key={idx} alt={slide.alt} src={slide.src} />
        ))}
      </ul>
      <button className="previous-button" onClick={onClickButton}>
        <img className="previous" alt="<" src="images/main_arr_prev.png" />
      </button>
      <button className="next-button" onClick={onClickButton}>
        <img className="next" alt=">" src="images/main_arr_next.png" />
      </button>
      <button className="index-button" onClick={clickHandler}>
        {dataFromServer.map(data => (
          <span
            key={data.id}
            className={currentIndex === data.id ? 'active' : ''}
          >
            {data.id}
          </span>
        ))}
      </button>
    </div>
  );
};
export default Carousel;
