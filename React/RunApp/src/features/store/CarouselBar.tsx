import { Carousel } from '@mantine/carousel';
import SimpleProductCard from './SimpleProductCard';

function CarouselBar() {
  const products = Array.from({ length: 10 }).map((x) => (
    <Carousel.Slide>
      <SimpleProductCard />
    </Carousel.Slide>
  ));
  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%', md: '23%' }}
      slideGap={{ base: 0, sm: 'md' }}
      loop
      align="start"
    >
      {products}
    </Carousel>
  );
}

export default CarouselBar;
