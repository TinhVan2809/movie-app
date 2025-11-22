import React, { useState } from 'react';
import '../styles/Slideshow.css';

const Slideshow = ({ items, renderItem, itemsPerScreen = 6 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return <div>Loading slides...</div>;
  }

  // Total number of "pages"
  const totalPages = Math.ceil(items.length / itemsPerScreen);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1));
  };

  // Calculate the starting and ending index for the current "page"
  const startIndex = currentIndex * itemsPerScreen;
  const endIndex = startIndex + itemsPerScreen;
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div className="slideshow-container">
      <div className="slideshow-slider">
        {visibleItems.map((item, index) => (
          <div className="slide" key={startIndex + index}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <button className="prev" onClick={goToPrevious}>&#10094;</button>
      <button className="next" onClick={goToNext}>&#10095;</button>
    </div>
  );
};

export default Slideshow;

