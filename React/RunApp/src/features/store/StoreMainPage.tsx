import { Title, Divider } from '@mantine/core';
import StoreCarousel from './StoreCarousel';
import StoreBanner from './StoreBanner';
import classes from './svg.module.css';
import CardsGrid from './CardsGrid';
import CarouselBar from './CarouselBar';
import ArticleCard from './ArticleCard';
import SectionBanner from './SectionCard';

function StoreMainPage() {
  return (
    <div style={{ backgroundColor: '#f5f7f7', paddingTop: 1, paddingBottom: 1 }}>
      <StoreCarousel />
      <div className={classes.banner} />

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
          color={'#023020'}
          width={90}
          Buttontext={'Keep on working out'}
          margin={undefined}
          height={520}
        />
      </div>

      <div style={{ marginBottom: 100 }}>
        <CardsGrid />
      </div>
      <div style={{ marginBottom: 20, width: '100%' }}>
        <SectionBanner />
      </div>
      <div style={{ marginBottom: 200 }}>
        <CarouselBar />
      </div>
    </div>
  );
}

export default StoreMainPage;
