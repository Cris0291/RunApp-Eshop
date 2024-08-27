import { Grid, Skeleton, Container } from '@mantine/core';
import SimpleProductCard from './SimpleProductCard';

import ArticleCard from './ArticleCard';
import VerticalCard from './VerticalCard';

const child = <Skeleton height={140} radius="md" animate={false} />;

export function CardsGrid() {
  return (
    <div style={{ width: `95%`, margin: 'auto' }}>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 12 }}>
          {
            <ArticleCard
              height={322}
              src={
                'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              title={
                'Shop with the best prices, the best sales. Shop like there is no tomorrow, what are you waiting for'
              }
            />
          }
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 7 }}>
          {
            <ArticleCard
              height={322}
              src={
                'https://plus.unsplash.com/premium_photo-1661770227503-a64efc23fd8a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              title={'Be the owner of your own shop. Register with us and sale your products'}
            />
          }
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 5 }}>
          {
            <VerticalCard
              height={322}
              src={
                'https://images.unsplash.com/photo-1556484687-30636164638b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
            />
          }
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 7 }}>
          {
            <ArticleCard
              height={322}
              src={
                'https://plus.unsplash.com/premium_photo-1661598655597-8e6720995532?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              title={"Don't workout alone, share the experience share your goals"}
            />
          }
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 5 }}>
          {
            <VerticalCard
              height={322}
              src={
                'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
            />
          }
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default CardsGrid;
