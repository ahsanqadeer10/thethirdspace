import React from "react";

const ProductImageCarousel = (props) => {
  const images = props.images;

  return (
    <div
      id='productImageCarousel'
      className='carousel slide'
      data-ride='carousel'
    >
      <div class='carousel-inner'>
        {props.images.map((image, index) => {
          return (
            <div
              className={index === 0 ? "carousel-item active" : "carousel-item"}
            >
              <img src={image} className='d-block w-100'></img>
            </div>
          );
        })}
      </div>
      <a
        class='carousel-control-prev'
        href='#productImageCarousel'
        role='button'
        data-slide='prev'
      >
        <span class='carousel-control-prev-icon' aria-hidden='true'></span>
        <span class='sr-only'>Previous</span>
      </a>
      <a
        class='carousel-control-next'
        href='#productImageCarousel'
        role='button'
        data-slide='next'
      >
        <span class='carousel-control-next-icon' aria-hidden='true'></span>
        <span class='sr-only'>Next</span>
      </a>
    </div>
  );
};

export default ProductImageCarousel;
