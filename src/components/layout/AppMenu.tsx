import React, { useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import Menu from "./menu";
import { menuData } from './menuData';
import Cookies from 'universal-cookie';
import { MenuItem } from "./menuDatatypes";


const cookies = new Cookies();

const AppMenu: React.FC = () => {


  let tabs: MenuItem[] = menuData
    .map((item) => {
      const subarrayFiltrado = item.children.filter(
        (subitem) => subitem.roles.indexOf("All") > 0
      );
      return { ...item, tabChildren: subarrayFiltrado };
    })
    .filter((_temp_tabs) => _temp_tabs.roles.indexOf("All") > 0);


  
  if (cookies.get('Sgm_cUsuario') !== undefined) {
    if (cookies.get('Sgm_cUsuario') !== "" && cookies.get('Sgm_cUsuario') !== null) {
      tabs = menuData
        .map((item) => {
          const subarrayFiltrado = item.children.filter(
            (subitem) => subitem.roles.indexOf(cookies.get('Sgm_cRole')) > 0
          );
          return { ...item, tabChildren: subarrayFiltrado };
        })
        .filter((menuData) => menuData.roles.indexOf(cookies.get('Sgm_cRole')) > 0);
    }
  }


  const sortMenuItems = tabs.sort((a, b) => (a.tabOrder > b.tabOrder ? 1 : -1));



  return (
    <Drawer
      variant="permanent"
      sx={{

        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          top: 64,
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Menu menuItems={sortMenuItems} />
    </Drawer>

  );
};

export default AppMenu;
