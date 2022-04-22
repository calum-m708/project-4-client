import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
const CarouselUploaded = ({ uploadedCards }) => {
  console.log('uploaded cards is', uploadedCards);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider">
      <Slider {...settings}>
        {uploadedCards.map((card) => (
          <div key={card.id} className="slider-element">
            <Link to={`/cards/${card.id}`}>
              <img
                src={`https://res.cloudinary.com/dthhn8y5s/${card.image}`}
                alt={card.name}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselUploaded;
