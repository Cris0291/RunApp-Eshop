import { Paper, Group } from '@mantine/core';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import usePathChange from '@/hooks/usePathChange';
import StoreNavBar from '@/features/store/StoreNavBar';
import '@mantine/core/styles/Group.css';
import StoreMainPage from '@/features/store/StoreMainPage';

function AppLayout() {
  const path = usePathChange();
  if (path == '/')
    return (
      <Paper p="md" radius={0} style={{ mih: '100vh', backgroundColor: ' #1a103d' }}>
        <NavBar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </Paper>
    );

  return (
    <Paper radius={0} style={{ mih: '100vh' }}>
      <StoreNavBar />
      <StoreMainPage />
    </Paper>
  );
}

export default AppLayout;
