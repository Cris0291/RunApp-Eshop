import { Container, Box, ScrollArea } from '@mantine/core';
import classes from './storeProduct.module.css';
import SideBar from './SideBar';

function StoreProducts() {
  return (
    <div className={classes.grid}>
      <div style={{ width: '100%' }}>
        <SideBar />
      </div>
      <div style={{ backgroundColor: 'white', width: '100%' }}></div>
    </div>
  );
}

export default StoreProducts;
