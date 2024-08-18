import { Paper } from '@mantine/core';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import usePathChange from '@/hooks/usePathChange';
import '@mantine/core/styles/Group.css';
import GeneralNavBar from '@/features/store/GeneralNavBar';

function AppLayout() {
  const path = usePathChange();
  const test = path == '/' ? '#1a103d' : '#000000';
  return (
    <Paper radius={0} style={{ mih: '100vh', backgroundColor: test }}>
      {path == '/' ? <NavBar /> : <GeneralNavBar />}
      <div>
        <Outlet />
      </div>
      <Footer />
    </Paper>
  );
}

export default AppLayout;
