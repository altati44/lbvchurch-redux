import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';



import { connect } from "react-redux";
import axios from 'axios';

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

function Register(props) {

    const classes = useStyles();

    /*
        function handleSubmit(event) {
            alert('A name was submitted: ' + event.target.value);
            event.preventDefault();
        };
    */
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    //para actualizar si es correcto el email y el password al subscribirlo al store
    function fieldsCorrect() {
        const valido = (props.validEmailRegExp.test(props.email) &&
            props.password.length >= 6);
        return valido;
    }


    const onRegisterUserSubmit = async (e) => {
        e.preventDefault();
        //console.log(props.userName)
        const res = await axios.post('http://localhost:5000/api/signup', {

            "username": props.userName,
            "email": props.email,
            "password": props.password

        });
        //this.setState({ firstname: '' });
        //this.getFriends();
        if (res.data.success === 1) {
            props.messageOpen(res.data.message, 'success')
            //props.loggedIn();
            props.registerFormClose();

        } else { props.messageOpen(res.data.data, 'error') }

    }



    return (
        <div>
            <Dialog
                style={{ top: -450 }}
                open={props.showRegister}
                onClose={props.registerFormClose}
                aria-labelledby="register-dialog-title"
                aria-describedby="register-dialog-description"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <form method="post" className="commentForm" onSubmit={onRegisterUserSubmit}>
                    <DialogTitle style={{ textAlign: "center", color: "#2196f3" }} id="register-dialog-title">
                        <Typography component="div">
                            <Box fontSize="h4.fontSize" fontWeight="fontWeightBold" m={1}>
                                Friends Register
                             </Box>
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">

                                <InputLabel htmlFor="inputUserName">User Name</InputLabel>
                                <OutlinedInput
                                    id="inputUserName"
                                    type={'text'}
                                    value={props.userName}
                                    onChange={(event) => {
                                        props.updateUserName(event.target.value)
                                    }}
                                    labelWidth={70}
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">

                                <InputLabel htmlFor="inputEmailRegister">Email</InputLabel>
                                <OutlinedInput
                                    id="inputEmailRegister"
                                    type='text'
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

                                <InputLabel htmlFor="inputPasswordRegister">Password</InputLabel>
                                <OutlinedInput
                                    id="inputPasswordRegister"
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

                        <Button onClick={() => {
                            //if (props.is) {
                            props.loginFormOpen();
                            props.registerFormClose();
                            //}
                        }

                        } color="primary">
                            Cancel
                    </Button>
                        <Button onClick={(e) => {
                            e.persist();
                            //checkEmailAndPassword(e);
                            if (fieldsCorrect()) {
                                onRegisterUserSubmit(e);
                                props.registerFormClose();
                                if (!props.isLoggedIn) props.loginFormOpen();
                            } else props.messageOpen('Invalid entries...', 'error')
                        }
                        } color="primary" autoFocus>
                            Register
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    );


}


const mapStateToProps = state => ({
    userName: state.userName,
    email: state.email,
    password: state.password,
    register: state.register,
    emailValid: state.emailValid,
    passwordValid: state.passwordValid,
    showLogin: state.showLogin,
    isLoggedIn: state.isLoggedIn,
    showRegister: state.showRegister,
    passwordVisible: state.passwordVisible,
    validEmailRegExp: state.validEmailRegExp
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
    registerFormClose() {
        dispatch({
            type: "REGISTER_FORM_CLOSE"
        })
    },
    showPassword() {
        dispatch({
            type: "SHOW_PASSWORD"
        })
    },
    updateUserName(userName) {
        dispatch({
            type: "UPDATE_USER_NAME",
            userName
        })
    },
    updateEmail(email) {
        dispatch({
            type: "UPDATE_EMAIL",
            email: email
        })
    },
    updatePassword(event) {
        dispatch({
            type: "UPDATE_PASSWORD",
            password: event.target.value
        })
    },
    updateToken(token) {
        dispatch({
            type: "UPDATE_TOKEN",
            token
        })
    },
    checkEmail(email) {
        console.log(email + 'sdghsdghs')
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
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(Register);