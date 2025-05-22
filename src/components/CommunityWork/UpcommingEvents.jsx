// src/components/CommunityWork/UpcommingEvents.jsx
import React from "react";
import Carousel from "react-bootstrap/Carousel";
// import background from "../../assets/background.avif"; // Use assets folder, not public

function CarouselFadeExample() {
  return (
    <Carousel fade className="w-full max-w-4xl">
      <Carousel.Item>
        <img
          className="d-block w-100 rounded-lg"
          src="logo.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="text-white">First slide label</h3>
          <p className="text-white">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 rounded-lg"
          src={background}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="text-white">Second slide label</h3>
          <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 rounded-lg"
          src={background}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="text-white">Third slide label</h3>
          <p className="text-white">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
