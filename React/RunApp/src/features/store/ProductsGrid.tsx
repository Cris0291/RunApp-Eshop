import { Grid, Skeleton, Container } from '@mantine/core';
import SimpleProductCard from './SimpleProductCard';

const child = <Skeleton height={140} radius="md" animate={false} />;

export function ProductsGrid() {
  const products = Array.from({ length: 9 }).map((x) => (
    <Grid.Col span={{ base: 12, xs: 4 }}>
      <SimpleProductCard />
    </Grid.Col>
  ));
  return (
    <Container my="md">
      <Grid>{products}</Grid>
    </Container>
  );
}

export default ProductsGrid;
