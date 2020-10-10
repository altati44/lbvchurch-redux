import React from 'react';
import { createStore } from 'redux';
import allReducers from './reducers/reducer';

import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return phoneNumberString
}
/*
function formatUsPhone(phone) {

    var phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);

    phone = phone.trim();
    var results = phoneTest.exec(phone);
    if (results !== null && results.length > 8) {

        return "(" + results[3] + ") " + results[4] + "-" + results[5] + (typeof results[8] !== "undefined" ? " x" + results[8] : "");

    }
    else {
        return phone;
    }
}
*/
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
    usersRowsCount: 0,
    loadProfileData: false,//para cargar la data del user que hace login: menu, modulos, etc.
    userRows: [],
    userModules: [],
    filterOptions: false,
    friends: {},
    columns: [
        { title: "First Name", field: "firstname" },
        { title: "Middle Name", field: "middlename", /*width: "200px"*/ padding: 'none' },
        { title: "Last Name", field: "lastname" },
        {
            title: "Address", field: "address",
            render: rowData => (rowData.address !== null && rowData.address !== '') && <div>
                <a href={`https://maps.google.com?q=${rowData.address}`} target={"_blank"} style={{ textDecoration: 'none' }}>
                    <Tooltip title="Open on Google map">
                        <IconButton style={{ color: 'green' }} size="small">
                            <RoomOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </a>
                {rowData.address}
            </div>
        },
        {
            title: "Phone", field: "phone",
            render: rowData => (rowData.phone !== null && rowData.phone !== '') && <div>
                <a href={`tel:${rowData.phone}`} style={{ textDecoration: 'none' }}>
                    <Tooltip title="Call phone number">
                        <IconButton style={{ color: 'green' }} size="small">
                            <PhoneIcon />
                        </IconButton>
                    </Tooltip>
                </a>
                {formatPhoneNumber(rowData.phone)}
            </div>
        },
        //<a href="tel:600123456">Contacto: 600123456</a>
        { title: "Gender", field: "gender", cellStyle: { textAlign: 'center' } },
        { title: "Email", field: "email" },
        { title: "Country", field: "from" }
    ],
    openDrawer: false,
    selectedRow: 0,
    friendSelected: { id: 0 },
    friendDateSelected: null,
    dataUserSelected: null,
    friendDetails: [],
    showDetails: false, //para mostrar el panel de detalles de friends
    cursorPosition: {
        posX: 0,
        posY: 0
    },
    anchorRef: false,
    referencia: "anchorPosition",
    dataUsers: [],
    usersColumns: [
        { title: "User Name", field: "user_name" },
        { title: "Email", field: "user_email", /*width: "200px"*/ padding: 'none' },
        { title: "Created", field: "user_created" },
    ],

};

export default createStore(
    allReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);