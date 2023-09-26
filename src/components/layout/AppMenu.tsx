import React from 'react';
import { Drawer } from '@mui/material';
import Menu from "./menu";
import { menuData } from './menuData';

const AppMenu: React.FC = () => {

  return (
      <Drawer
        variant="permanent"
        sx={{
          
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            top:64,
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Menu menuItems={menuData} />
      </Drawer>
    
  );
};

export default AppMenu;
