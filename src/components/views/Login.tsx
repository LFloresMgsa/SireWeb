import React, { useState } from 'react';

import { Paper,  Grid, Button, TextField, Typography, Container, CssBaseline } from '@mui/material';
import Cookies from 'universal-cookie';
import { ApiService } from '../services/api.service';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RootState } from '../reducers';
import { connect } from 'react-redux';
import { setEmpCodigo, setPanAnio, setSoftCodSoft } from '../reducers/localStorageReducer';



interface Login {
  Emp_cCodigo: string;
  Pan_cAnio: string;
  soft_cCodSoft: string;
  setEmpCodigo: (code: string) => void;
  setPanAnio: (year: string) => void;
  setSoftCodSoft: (soft: string) => void;
}


const cookies = new Cookies();

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundImage: '',// `url(${fondo})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '91vh',
  },
  container: {
    opacity: '1',
    height: '70%',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: 0,
      width: '100%',
      height: '100%',
    },
  },
  div: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login: React.FC<Login> = ({
  Emp_cCodigo,
  Pan_cAnio,
  soft_cCodSoft,
  setEmpCodigo,
  setPanAnio,
  setSoftCodSoft,
}) => {
  
  const classes = useStyles()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logeo, setLogeo] = useState('');
  const [error, setError] = useState('');
  const [Token, setToken] = useState('');

  const BuscarToken = async () => {

    try {
      let _body = { Accion: "LOGIN", usu_cCodUsuario: username, usu_cClave: password }

      await ApiService.obtenerToken(_body).then(
        (res) => {
          setToken(res);
        },
        (error) => {
          console.log(error);
        }
      );

      if (Token) {
        cookies.set('token', Token, { path: "/" });
        setError('');
      }


    } catch (error) {
      setError('An error occurred while trying to login - token');
    }
  };


  const handleLogin = async () => {

    try {

      // genera un token
      await BuscarToken();


      // valida si encontro el token

      if (!cookies.get('token')) {
        throw "Error: Token no existe";
      }

      let _body = {
        Accion: "LOGIN", usu_cCodUsuario: username, usu_cClave: password, Emp_cCodigo: Emp_cCodigo, soft_cCodSoft: soft_cCodSoft
      }
      let _result: any;


      // si encontro el token ingresa el login
      await ApiService.obtenerUsuario(_body).then(

        (res) => {

          setLogeo(res);
          _result = res;
        },
        (error) => {
          console.log(error);
        }
      );



      if (_result.usuario === username && _result.respuesta === "1" ) {

        cookies.set('Sgm_cUsuario', _result.usuario, { path: "/" });
        cookies.set('Sgm_cNombre', _result.nombre, { path: "/" });
        cookies.set('Sgm_cContrasena', _result.clave, { path: "/" });
        cookies.set('Sgm_cRole', _result.role, { path: "/" });
        cookies.set('IsLoged', true, { path: "/" });

        setError('');

        if (cookies.get('token')) {
          window.location.href = "./inicio";
          //*console.log(soft_cCodSoft);
          //console.log(cookies.get('Sgm_cRole'));
        }
      }
    } catch (error) {
      setError('');
    }
  };

  return (
    <Container maxWidth="sm">

      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
          <div className={classes.div}>

            <Grid container spacing={1}  >

              <Grid item xs={12} lg={12}>


                <Typography component='h1' variant='h5'>Ingreso Sistema</Typography>

              </Grid>
              <Grid item xs={12} lg={12}>

                <form className={classes.form}>

                  <Grid container spacing={1}>

                    <Grid item xs={12} lg={12}>

                      <TextField
                        fullWidth
                        autoFocus
                        color='primary'
                        margin='normal'
                        variant='outlined'
                        label='Usuario'
                        name='nickname'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <TextField
                        fullWidth
                        type='password'
                        color='primary'
                        margin='normal'
                        variant='outlined'
                        label='Contraseña'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={handleLogin}
                      >
                        Ingresar
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </div>
        </Container >
      </Grid >


    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  Emp_cCodigo: state.localStorage.Emp_cCodigo,
  Pan_cAnio: state.localStorage.Pan_cAnio,
  soft_cCodSoft: state.localStorage.soft_cCodSoft,
});

const mapDispatchToProps = {
  setEmpCodigo,
  setPanAnio,
  setSoftCodSoft,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
