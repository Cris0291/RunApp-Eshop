import { Title } from '@mantine/core';
import StoreCarousel from './StoreCarousel';
import StoreBanner from './StoreBanner';
import StoreSVG from './StoreSVG';
import classes from './svg.module.css';
import CarouselBar from './CarouselBar';

function StoreMainPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      <StoreCarousel />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StoreBanner
          MainTitle={'Wait a minute...'}
          Subtitle={'Take a moment to check our app'}
          Body={'Get the body of your dreams was never that easy, get fit the easy way!!!'}
          color={'#80d0fd'}
          width={100}
          Buttontext={'Keep on working out'}
          margin={undefined}
          height={320}
        />
      </div>

      <div style={{ marginTop: 100 }}></div>
      <CarouselBar />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StoreSVG />
      </div>
      <Title order={1} className={classes.title} ta="center">
        Shopping and running that's the only way
      </Title>
    </div>
  );
}

export default StoreMainPage;
