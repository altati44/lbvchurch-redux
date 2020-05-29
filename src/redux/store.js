import { createStore } from 'redux';
import allReducers from './reducers/reducer';

const initialState = {
    cart: [],
    validEmailRegExp: RegExp(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/),
    mostrar: false,
    user: '',
    role: '',
    modules: '',
    login: true,
    register: false,
    emailValid: false,
    passwordValid: false,
    isLoggedIn: false,
    showLogin: true,
    showRegister: false,
    //showPassword: false,
    passwordVisible: false,
    tokenExist: false,
    token: '',
    userName: '',
    email: 'altati44@gmail.com',
    password: 'T@tic@44',
    messageBoxData: {
        message: '',
        open: false,
        smsType: '#4caf50',
        messageType: {
            success: '#4caf50',
            information: '#2196f3',
            warning: '#ff9800',
            error: '#f50057'
        }
    }
};

export default createStore(
    allReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);