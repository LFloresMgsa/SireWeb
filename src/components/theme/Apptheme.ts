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
    mode: 'dark',
    primary: { main: 'rgb(102, 157, 246)' },
    background: { paper: 'rgb(111, 11, 31)' },
  },

});


export default theme ;

