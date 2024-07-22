import { Container } from '@mantine/core';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function AppLayout() {
  return (
    <Container fluid h={50}>
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
}

export default AppLayout;
