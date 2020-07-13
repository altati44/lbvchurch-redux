import { createStore } from 'redux';
import allReducers from './reducers/reducer';

const initialState = {
    cart: [],
    validEmailRegExp: RegExp(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,4})+$/),
    mostrar: false,
    role: '',
    modules: '',
    isLoggedIn: false,
    login: true,
    showLogin: true,
    register: false,
    showRegister: false,
    emailValid: true,
    passwordValid: true,
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
    },
    data: {},
    user: {
        userName: '',
        role: '',
        role_id: '',
        modules: {
            module_name: '',
            module_id: '',
            module_access: ''
        }
    },
    rowsCount: 0,
    loadProfileData: false,//para cargar la data del user que hace login: menu, modulos, etc.
    userRows: [],
    userModules: [],
    filterOptions: false,
    friends: {},
    columns: [
        { title: "First Name", field: "firstname" },
        { title: "Middle Name", field: "middlename" },
        { title: "Last Name", field: "lastname" }
    ],
    openDrawer: false,
    friendSelected: { friend_id: 0 },
    friendDetails: [],
    showDetails: false //para mostrar el panel de detalles de friends
};

export default createStore(
    allReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);