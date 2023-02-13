import React, { useEffect, useState } from 'react';
import './Carousel.scss';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideList, setSlideList] = useState([]);
  const [action, setAction] = useState(true);
  const [isTransition, setIsTransition] = useState(false);
  const [dataFromServer, setDataFromServer] = useState([]);

  // useEffect(() => {
  //   setSlideList(IMAGE_LIST);
  //   setSlideList(prev => [
  //     IMAGE_LIST[IMAGE_LIST.length - 1],
  //     ...prev,
  //     IMAGE_LIST[0],
  //   ]);
  // }, []);

  useEffect(() => {
    fetch('carousel.json')
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
          return curIndex - 1;
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
        {slideList.map(({ src }, idx) => (
          <img key={idx} alt="Slide" src={src} />
        ))}
      </ul>
      <button className="previous-button" onClick={onClickButton}>
        <img className="previous" alt="<" src="images/main_arr_prev.png" />
      </button>
      <button className="next-button" onClick={onClickButton}>
        <img className="next" alt=">" src="images/main_arr_next.png" />
      </button>
      <button className="index-button" onClick={clickHandler}>
        {/* {Array(IMAGE_LIST.length)
          .fill()
          .map((_, idx) => (
            <span
              key={idx}
              className={currentIndex === idx + 1 ? 'active' : ''}
            >
              {idx + 1}
            </span>
          ))} */}
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

const IMAGE_LIST = [
  {
    src: 'https://cdn-mart.baemin.com/inventory-unit/c219f0b9-0674-453a-a8a2-7a89ffbd3bf0.png',
  },
  {
    src: 'https://cdn-mart.baemin.com/inventory-unit/24fee219-24f3-479d-8918-95536b469cfb.jpg',
  },
  {
    src: 'https://cdn-mart.baemin.com/inventory-unit/ceb02ee2-d489-4101-8dd7-0b44f7145196.png',
  },
];
