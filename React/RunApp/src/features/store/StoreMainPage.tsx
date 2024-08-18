import { Title } from '@mantine/core';
import StoreCarousel from './StoreCarousel';
import StoreBanner from './StoreBanner';
import StoreSVG from './StoreSVG';
import classes from './svg.module.css';
import ProductsGrid from './ProductsGrid';

function StoreMainPage() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', paddingTop: 1, paddingBottom: 1 }}>
      <StoreCarousel />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 100,
        }}
      >
        <StoreBanner
          MainTitle={'Wait a minute...'}
          Subtitle={'Take a moment to check our app'}
          Body={'Get the body of your dreams was never that easy, get fit the easy way!!!'}
          color={'#000000'}
          width={100}
          Buttontext={'Keep on working out'}
          margin={undefined}
          height={320}
        />
      </div>

      <div style={{ marginBottom: 50 }}>
        <Title order={1} className={classes.title} ta="center" c="black">
          Hot Sales!!!
        </Title>
        <ProductsGrid />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <StoreSVG />
      </div>
      <Title order={1} className={classes.title} ta="center">
        Shopping and running that's the only way
      </Title>
    </div>
  );
}

export default StoreMainPage;
