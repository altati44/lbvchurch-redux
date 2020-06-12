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
    ]
};

export default createStore(
    allReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);