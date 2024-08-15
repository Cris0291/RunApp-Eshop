import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import classes from './storeCarousel.module.css';
import Banner from './Banner';

function StoreCarousel() {
  const images = [
    {
      element: (
        <Banner
          image={
            'https://images.unsplash.com/photo-1473187983305-f615310e7daa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
      ),
      key: 0,
    },
    {
      element: (
        <Banner
          image={
            'https://images.unsplash.com/photo-1555529669-26f9d103abdd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
      ),
      key: 1,
    },
    {
      element: (
        <Banner
          image={
            'https://plus.unsplash.com/premium_photo-1663036673685-1987d065dab3?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
      ),
      key: 0,
    },
  ];

  const slides = images.map((img) => <Carousel.Slide key={img.key}>{img.element}</Carousel.Slide>);

  return (
    <div className={classes.container}>
      <Carousel withIndicators height="100%" style={{ flex: 1 }}>
        {slides}
      </Carousel>
    </div>
  );
}
export default StoreCarousel;
