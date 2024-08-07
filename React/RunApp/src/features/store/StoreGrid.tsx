import { Grid, Skeleton, Container } from '@mantine/core';
import Banner from './Banner';
import StoreSVG from './StoreSVG';
import MinimalisticProductCard from './MinimalisticProductCard';
import StoreBanner from './StoreBanner';

export function StoreGrid() {
  const child = <MinimalisticProductCard />;

  return (
    <Container my="md">
      <Grid>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <StoreBanner />
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}

export default StoreGrid;
