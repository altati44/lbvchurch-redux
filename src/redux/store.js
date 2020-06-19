import { createStore } from 'redux';
import allReducers from './reducers/reducer';

const initialState = {
    cart: [],
    validEmailRegExp: RegExp(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/),
    mostrar: false,
    user: '',
    role: '',
    modules: '',
    isLoggedIn: false,
    login: true,
    showLogin: true,
    register: false,
    showRegister: false,
    emailValid: false,
    passwordValid: false,
    //showPassword: false,
    passwordVisible: false,
    tokenExist: false,
    token: '',
    userName: '',
    email: 'nnnn@gmail.com',
    password: '12345678',
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
    },
    datico: [],
    friends: {},
    columns: [
        { title: "First Name", field: "firstname" },
        { title: "Middle Name", field: "middlename" },
        { title: "Last Name", field: "lastname" }
    ],
    elemento: '< button class= "MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit" tabindex="0" type="button" id="icon-auth" aria- label="account of current user" aria - controls="menu-appbar" aria - haspopup="true" > <span class="MuiIconButton-label"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg></span><span class="MuiTouchRipple-root"></span></button >'
};

export default createStore(
    allReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);