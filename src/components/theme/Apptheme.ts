import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Cambia la fuente a la que desees
    fontSize: 11, // Cambia el tamaño de fuente aquí
    
    
  },  
  palette: {
    mode: 'light',
    primary: { main: 'rgb(111, 11, 31)' }, // fondo de botones
    secondary: { main: 'rgb(205, 183, 188)' }, // fondo de botones
    background: { paper: 'rgb(111, 11, 31)' }, // fonto de menu
    
  },

});


export default theme ;

