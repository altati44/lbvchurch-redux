import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';

import { SnackbarProvider } from 'notistack';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Login from './components/Login';
import MessageBox from './components/MessageBox';
import DentroDelDivApp from './components/DentroDelDivApp'
//import InputAdornment from '@material-ui/core/InputAdornment';

//import { SnackbarProvider, useSnackbar } from 'notistack';
//import { SnackbarProvider } from 'notistack';
import { useSnackbar } from 'notistack';


import { connect } from "react-redux";
import Register from './components/Register';
import TableTest from './components/TableTest';
import Input from '@material-ui/core/Input';
import RemoteTable from './components/RemoteTable'


import { BrowserRouter as Router, Route } from 'react-router-dom';

//import store from './redux/store'



//...del App menubar
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  paper: {
    padding: theme.spacing(2),//dentro va la tabla
    /*/textAlign: 'center',*/
    //color: theme.palette.text.secondary,
    boxShadow: 'none'
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#2196f3',
  },
  toolbar2: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    //backgroundColor: '#2196f3',
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#main-bar');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };



  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
//del App menubar...




function App(props) {
  const classes = useStyles();

  //usado por el MessageBox
  const success = "#4caf50";
  const information = "#2196f3";
  const warning = "#ff9800";
  const error = "#f50057";

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('Success!');
  const [type, setType] = React.useState(success);

  const handleClick = (sms, smsType) => {
    setMessage(sms);//pongo el mensage
    setType(smsType);
    console.log({ type })
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  //hasta aqui para el MessageBox

  //NO LA USO PQ RENDERIZA EL FORM AUNQUE SEA EL MISMO
  /*
  function LoggedStatus() {
    if (!props.isLoggedIn) {//nadie se ha logeado, mantengo los forms
      console.log('login')
      return <Login />
    } else {
      if (props.login && props.showLogin) {
        console.log('login')
        //return null
      }
      if (props.register) {
        console.log('register')
        //return <Register />
      }
    }
  }
  */
  //Dos funciones para tratar los permisos de read, update, add y delete 
  //para mostrar los modulos correspondientes...
  function intToBitString(input, size, unsigned) {
    if ([8, 16, 32].indexOf(size) == -1) {
      throw "invalid params";
    }
    var min = unsigned ? 0 : - (2 ** size / 2);
    var limit = unsigned ? 2 ** size : 2 ** size / 2;
    if (!Number.isInteger(input) || input < min || input >= limit) {
      throw "out of range or not an int";
    }
    if (!unsigned) {
      input += limit;
    }
    var binary = input.toString(2).replace(/^-/, '');
    return binary;//si quiero el size completo =>>> return binary.padStart(size, '0');
  }

  function bitStringToInt(input, size, unsigned) {
    if ([8, 16, 32].indexOf(size) == -1) {
      throw "invalid params";
    }
    input = parseInt(input, 2);
    if (!unsigned) {
      input -= 2 ** size / 2;
    }
    return input;
  }
  //..........................................


  return (
    <div>
      <div>
        {/*< LoggedStatus />para manejar que formulario de registro o de login renderizo*/}
        {!props.isLoggedIn && <Login />}
        {(!props.isLoggedIn && props.register) && <Register />}


      </div>
      <Router>

        <React.Fragment>
          <CssBaseline />
          <AppBar>
            <div>

              <Toolbar className={classes.toolbar}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>

                    <Paper className={classes.paper}

                      onClick={() => {
                        function binaries(num1) {
                          var str = num1.toString(2)
                          return str;
                        }

                        props.loginFormOpen()
                        //console.log(bitStringToInt('0111',16,true))
                        let bite = 256;
                        //console.log(bite + ' to binary: ' + bite.toString(2));

                        console.log(' to String: ' + intToBitString(9, 8, true));
                        console.log(' to Integer: ' + bitStringToInt('1111', 8, true));

                        console.log(Boolean(Number(intToBitString(9, 8, true)[0])))
                      }}
                    >LOGIN
                         <Input id="testingBit" type='text' onChange={(e) => { }}></Input>

                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    {props.mostrar && (
                      <Paper className={classes.paper} onClick={() => {

                      }}>MOSTRAR</Paper>
                    )
                    }
                  </Grid>
                  <Grid item xs={3}>
                    <Paper className={classes.paper}>
                      <Button>HOLA NEW INFO</Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4">Lake Buena Vista Friends</Typography>
                  </Grid>
                  <Grid item xs={3}>
                  </Grid>
                </Grid>
              </Toolbar>
            </div>

          </AppBar>

          <Container maxWidth="xl">
            <Toolbar className={classes.toolbar2} id="main-bar" />{/**solo para regresar el scroll */}

            <div >      {/*div del SimpleSnackBar*/}
              <MessageBox
                on_Close={props.messageClose}
                on_Open={props.messageBoxData.open}
                body_message={props.messageBoxData.message}
                type_message={props.messageBoxData.smsType}
              />
            </div>
            <div>{/**EN ESTE DIV VA EL CONTENIDO A MOSTRAR DE TODAS LAS PAGINAS O COMPONENTES */}
              {/*<DentroDelDivApp />*/}
              <RemoteTable />


            </div>{/**FIN DEL DIV PARA MOSTRAR EL CONTENIDO */}
          </Container>
          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </React.Fragment>

      </Router>
    </div >
  );
}

const mapStateToProps = state => ({
  mostrar: state.mostrar,
  login: state.login,
  register: state.register,
  showLogin: state.showLogin,
  showRegister: state.showRegister,
  isLoggedIn: state.isLoggedIn,
  messageBoxData: state.messageBoxData
});

//actualiza la forma como saldra el mensaje
const mapDispatchToProps = dispatch => ({
  messageOpen(message, smsType) {
    dispatch({
      type: "MESSAGE_OPEN",
      message,
      smsType
    })
  },
  loggedIn() {
    dispatch({
      type: "LOGGED_IN"
    })
  },
  loginFormClose() {
    dispatch({
      type: "LOGIN_FORM_CLOSE"
    })
  },
  loginFormOpen() {
    dispatch({
      type: "LOGIN_FORM_OPEN"
    })
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(App);
