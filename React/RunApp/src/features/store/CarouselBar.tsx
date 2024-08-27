import { Carousel } from '@mantine/carousel';
import SimpleProductCard from './SimpleProductCard';
import ProductCard from './ProductCard';

function CarouselBar() {
  const products = Array.from({ length: 10 }).map((x) => (
    <Carousel.Slide>
      <ProductCard />
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
