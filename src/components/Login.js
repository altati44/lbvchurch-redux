import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'typeface-roboto';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '40ch',
    },
}));

/**
axios.post(url, {
  headers: {
    'Authorization': `Basic ${token}`
  }
})
*/

function Login(props) {

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.checkEmail(props.email); props.checkPassword(props.password);
        //console.log(props.emailValid + ':' + props.passwordValid)
        if (props.emailValid && props.passwordValid) {
            console.log(props.emailValid + ':' + props.passwordValid)
            try {
                axios.defaults.headers.common['Authorization'] = '';
                const res = await axios.post('http://localhost:5000/api/signin', {
                    email: props.email,
                    password: props.password
                });
                if (res.data.success === 1) {
                    //console.log(res.data.result[0].user_name)
                    props.messageOpen(res.data.user.name + ' ' + res.data.message, 'success')
                    props.updateToken(res.data.token)
                    props.loggedIn(res.data.user.name);
                    props.loginFormClose();
                    console.log('EJECUTANDO...loginFormCLose');
                    //let sss = Object.assign({}, props.elemento);
                    //console.log(sss);

                } else {
                    props.messageOpen(res.data.data, 'error')
                    console.log(res.data.data)
                }

            } catch{ props.messageOpen('Connection refused.', 'error') }
        } else props.messageOpen('Invalid entries...', 'error');
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Dialog
                style={{ top: -500 }}
                open={props.showLogin}
                onClose={props.loginFormClose}
                aria-labelledby="login-dialog-title"
                aria-describedby="login-dialog-description"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <form method="post" className="commentForm" onSubmit={handleSubmit}>
                    <DialogTitle style={{ textAlign: "center", color: "#2196f3" }} id="login-dialog-title">
                        <Typography component="div">
                            <Box fontSize="h4.fontSize" fontWeight="fontWeightBold" m={1}>
                                Friends Login
                             </Box>

                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">

                                <InputLabel htmlFor="inputEmailLogin">Email</InputLabel>
                                <OutlinedInput
                                    id="inputEmailLogin"
                                    type='email'
                                    value={props.email}
                                    onChange={(event) => {
                                        props.updateEmail(event.target.value)
                                    }}
                                    labelWidth={70}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">

                                <InputLabel htmlFor="inputPasswordLogin">Password</InputLabel>
                                <OutlinedInput
                                    id="inputPasswordLogin"
                                    type={props.passwordVisible ? 'text' : 'password'}
                                    value={props.password}
                                    onChange={(event) => {
                                        //event.persist()//para evitar problemas con el event cuandp lo pongo edentro de funciones async
                                        props.updatePassword(event)
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => { props.showPassword() }}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {props.passwordVisible ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Grid item xs={6}>
                            <Button onClick={() => {
                                props.registerFormOpen();
                                props.loginFormClose();
                            }}
                                color="primary"
                            >
                                Register
                        </Button>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={3}>
                            <Button type="submit" color="primary">
                                Login
                    </Button>
                        </Grid>
                    </DialogActions>
                </form>

            </Dialog>

        </div>
    );
}


const mapStateToProps = state => ({
    register: state.register,
    showRegister: state.showRegister,
    showLogin: state.showLogin,///////////////////repetido aqui
    password: state.password,
    email: state.email,
    passwordVisible: state.passwordVisible,
    emailValid: state.emailValid,
    passwordValid: state.passwordValid,
    elemento: state.elemento
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
    loggedIn(userName) {
        dispatch({
            type: "LOGGED_IN",
            userName
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
    },
    registerFormOpen() {
        dispatch({
            type: "REGISTER_FORM_OPEN"
        })
    },
    showPassword() {
        dispatch({
            type: "SHOW_PASSWORD"
        })
    },
    updatePassword(event) {
        dispatch({
            type: "UPDATE_PASSWORD",
            password: event.target.value
        })
    },
    updateEmail(email) {
        dispatch({
            type: "UPDATE_EMAIL",
            email: email
        })
    },
    updateToken(token) {
        dispatch({
            type: "UPDATE_TOKEN",
            token
        })
    },
    checkEmail(email) {
        dispatch({
            type: "CHECK_EMAIL",
            email
        })
    },
    checkPassword(password) {
        dispatch({
            type: "CHECK_PASSWORD",
            password
        })
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);