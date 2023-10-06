import React, { useState, useRef } from 'react';
import { Paper, Grid, Button, TextField, Typography, Container, CssBaseline } from '@mui/material';
import Cookies from 'universal-cookie';
import { ApiService } from '../services/api.service';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RootState } from '../reducers';
import { connect } from 'react-redux';
import { setEmpCodigo, setPanAnio, setSoftCodSoft } from '../reducers/localStorageReducer';
import Autocomplete from '@mui/material/Autocomplete';



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
    backgroundImage: ''/*`url(${fondo})`*/,
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

  selectedOption: {
    background: 'lightblue', // Color de fondo para el elemento seleccionado
  },

  unselectedOption: {
    background: 'white', // Color de fondo para el elemento seleccionado
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

  interface EmpresaType {
    emp_cCodigo: string;
    emp_cNombreLargo: string;
  }

  interface AnioType {
    pan_cAnio: string;
    pan_cEstado: string;
  }

  const classes = useStyles()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [empresas, setEmpresas] = useState<EmpresaType[]>([]);
  const [anios, setAnios] = useState<AnioType[]>([]);
  const [logeo, setLogeo] = useState('');
  const [error, setError] = useState('');
  const [Token, setToken] = useState('');

  

  let IsLogedIni = cookies.get('IsLogedIni');
  let IsLoged = cookies.get('IsLoged');

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

  const handleConect = async () => {

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



      if (_result.usuario === username && _result.respuesta === "1") {

        cookies.set('Sgm_cUsuario', _result.usuario, { path: "/" });
        cookies.set('Sgm_cNombre', _result.nombre, { path: "/" });
        cookies.set('Sgm_cContrasena', _result.clave, { path: "/" });
        cookies.set('Sgm_cRole', _result.role, { path: "/" });
        cookies.set('IsLoged', false, { path: "/" });
        cookies.set('IsLogedIni', true, { path: "/" });


        setError('');

        if (cookies.get('token')) {

          IsLogedIni = true;

          await BuscarEmpresas();

          //console.log(empresas);

          //window.location.href = "./inicio";
          //console.log(soft_cCodSoft);
          //console.log(cookies.get('Sgm_cRole'));
        }
      }
    } catch (error) {
      setError('');
    }
  };

  const BuscarEmpresas = async () => {

    try {

      if (!cookies.get('token')) {
        throw "Error: Token no existe";
      }

      let _body = {
        Accion: "EMPRESA", usu_cCodUsuario: username, usu_cClave: password, Emp_cCodigo: Emp_cCodigo, soft_cCodSoft: soft_cCodSoft
      }

      await ApiService.obtenerEmpresas(_body).then(

        (res) => {

          setEmpresas(res);

        },
        (error) => {
          console.log(error);
        }
      );

    } catch (error) {
      setError('');
    }
  };

  const BuscarAnios = async (empresa: string) => {

    try {

      if (!cookies.get('token')) {
        throw "Error: Token no existe";
      }

      let _body = {
        Accion: "ANIOS", usu_cCodUsuario: username, usu_cClave: password, Emp_cCodigo: empresa, soft_cCodSoft: soft_cCodSoft
      }

      await ApiService.obtenerAnios(_body).then(

        (res) => {

          setAnios(res);

        },
        (error) => {
          console.log(error);
        }
      );

    } catch (error) {
      setError('');
    }
  };

  const handleCancel = async () => {

    try {
      cookies.set('IsLogedIni', false, { path: "/" });
      window.location.href = "../../login";

    } catch (error) {
      setError('');
    }
  };

  const handleLogin = async () => {


    try {

      // valida si encontro el token

      if (!cookies.get('token')) {
        throw "Error: Token no existe";
      }

      cookies.set('IsLoged', true, { path: "/" });
      cookies.set('IsLogedIni', true, { path: "/" });


      setError('');

      if (cookies.get('token')) {

        IsLoged = true;

        window.location.href = "./inicio";
        //console.log(soft_cCodSoft);
        //console.log(cookies.get('Sgm_cRole'));
      }

    } catch (error) {
      setError('');
    }
  };

  const handleSelectionChangeEmpresa = async (event: React.ChangeEvent<{}>, value: EmpresaType | null) => {


    if (value !== null) {
      setEmpCodigo(value.emp_cCodigo);

      await BuscarAnios(value.emp_cCodigo);

      if (!anios) {
        setAnios([]);
      }

    }
  };

  const handleSelectionChangeAnio = async (event: React.ChangeEvent<{}>, value: AnioType | null) => {
    if (value !== null) {
      setPanAnio(value.pan_cAnio);

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
                <Typography component='h1' variant='h5' className='custom-bar-text'>Ingreso Sistema</Typography>
              </Grid>

              <Grid item xs={12} lg={12}>
                <form className={classes.form}>
                  {!IsLogedIni &&
                    <Grid container spacing={1}>
                      <Grid item xs={12} lg={12}>
                        <Typography variant='subtitle1' className='custom-bar-text'>Usuario:</Typography>
                        <TextField
                          fullWidth
                          autoFocus
                          margin='normal'
                          variant='outlined'
                          name='nickname'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className='custom-input'
                        />
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Typography variant='subtitle1' className='custom-bar-text'>Contraseña:</Typography>
                        <TextField
                          fullWidth
                          type='password'
                          margin='normal'
                          variant='outlined'
                          name='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className='custom-input'
                        />
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Button
                          fullWidth
                          variant='contained'
                          color='secondary'
                          className={classes.button}
                          onClick={handleConect}
                        >
                          Conectar
                        </Button>
                      </Grid>
                    </Grid>
                  }

                  {IsLogedIni &&
                    <Grid container spacing={1}>
                      <Grid item xs={12} lg={12}>
                        <Typography variant='subtitle1' className='custom-bar-text'>Empresa:</Typography>
                        <Autocomplete
                          disablePortal
                          id="combo-empresas"
                          
                          options={empresas}
                          onChange={handleSelectionChangeEmpresa}
                          getOptionLabel={(option) => `${option.emp_cCodigo} - ${option.emp_cNombreLargo}`}
                          renderInput={(params) => <TextField {...params} variant="standard" />}
                          className='custom-autocomplete'
                          renderOption={(props, option: EmpresaType, state) => (
                            <li
                              {...props}
                              style={{ background: state.selected ? 'lightblue' : 'white' }}
                            >
                              {option.emp_cCodigo} - {option.emp_cNombreLargo}
                            </li>
                          )}
                        />

                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Typography variant='subtitle1' className='custom-bar-text'>Año:</Typography>
                        <Autocomplete
                          disablePortal
                          id="combo-anios"
                          options={anios}
                          
                          onChange={handleSelectionChangeAnio}
                          getOptionLabel={(option) => `${option.pan_cAnio}`}
                          renderInput={(params) => <TextField {...params} variant="standard" />}
                          className='custom-autocomplete'
                          renderOption={(props, option: AnioType, state) => (
                            <li
                              {...props}
                              style={{ background: state.selected ? 'lightblue' : 'white' }}
                            >
                              {option.pan_cAnio}
                            </li>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} lg={12}>

                        <Grid container spacing={1}>
                          <Grid item xs={6} lg={6}>
                            <Button
                              fullWidth
                              variant='contained'
                              color='secondary'
                              className={classes.button}
                              onClick={handleLogin}
                            >
                              Ingresar
                            </Button>
                          </Grid>
                          <Grid item xs={6} lg={6}>
                            <Button
                              fullWidth
                              variant='contained'
                              color='secondary'
                              className={classes.button}
                              onClick={handleCancel}
                            >
                              Cancelar
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  }

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
