import { Container } from '@mantine/core';
import StoreNavBar from './StoreNavBar';
import MainNavBar from './MainNavBar';

function GeneralNavBar() {
  return (
    <Container fluid>
      <StoreNavBar />
      <MainNavBar />
    </Container>
  );
}

export default GeneralNavBar;
