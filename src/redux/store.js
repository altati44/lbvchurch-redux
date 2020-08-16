import React from 'react';
import { createStore } from 'redux';
import allReducers from './reducers/reducer';

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
}

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
        { title: "Middle Name", field: "middlename", /*width: "200px"*/ },
        { title: "Last Name", field: "lastname" },
        { title: "Address", field: "address" },
        { title: "Phone", field: "phone", render: rowData => <a href={`tel:${rowData.phone}`} style={{ textDecoration: 'none' }}>{formatPhoneNumber(rowData.phone)}</a> },
        //<a href="tel:600123456">Contacto: 600123456</a>
        { title: "Gender", field: "gender", cellStyle: { textAlign: 'center' } },
        { title: "Email", field: "email" },
        { title: "Country", field: "from" }
    ],
    openDrawer: false,
    selectedRow: 0,
    friendSelected: { friend_id: 0 },
    friendDateSelected: null,
    friendDetails: [],
    showDetails: false, //para mostrar el panel de detalles de friends
    cursorPosition: {
        posX: 0,
        posY: 0
    },
    anchorRef: false,
    referencia: "anchorPosition"
};

export default createStore(
    allReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);