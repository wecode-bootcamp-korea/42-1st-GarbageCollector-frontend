import React from 'react';
import './Slide.scss';

const Slide = ({ slide }) => {
  console.log(slide);
  const { src, alt } = slide;
  return <img alt={alt} src={src} />;
};

export default Slide;
