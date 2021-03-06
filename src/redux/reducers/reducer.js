
const reducer = (state = {}, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: state.cart.concat(action.product),
                //mostrar: true
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(product =>
                    product.id !== action.product.id),
                //mostrar: false
            }
        case "SET_REGISTER":
            return {
                ...state,
                register: !state.register,
                login: !state.login,
                mostrar: true
            }
        case "LOGN_IN":
            console.log('Arreglar esto....................LOG_IN........................')
            return {
                ...state,
                login: !state.login,
                register: !state.register,
                mostrar: false
            }
        case "LOG_OUT":
            return {
                ...state,
                login: !state.login,
                register: !state.register,
                userName: '',
                isLoggedIn: false,
                showLogin: true,
                tokenExist: false,
                token: '',
                emailValid: false,
                passwordValid: false
            }
        case 'CHECK_EMAIL':
            //const validEmailRegExp = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
            return {
                ...state,
                //emailValid: state.emailValid = state.validEmailRegExp.test(action.email)
            }
        case 'CHECK_PASSWORD':
            console.log(action.password.length + '>>>pasa')
            return {
                ...state,
                //passwordValid: action.password.length >= 6
            }
        case "MESSAGE_CLOSE":
            return {
                ...state,
                messageBoxData: {
                    ...state.messageBoxData,
                    open: false
                }
            }
        case "MESSAGE_OPEN":
            return {
                ...state,
                messageBoxData: {
                    ...state.messageBoxData,
                    open: !state.messageBoxData.open,
                    message: action.message,
                    smsType: state.messageBoxData.messageType[action.smsType]
                }
            }
        case "LOGGED_IN":
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                loadProfileData: true
            }
        case "LOGIN_FORM_CLOSE":
            return {
                ...state,
                showLogin: false,
                //showRegister: false,
                //register: false,
                login: false,
                passwordVisible: false
            }
        case "LOGIN_FORM_OPEN":
            return {
                ...state,
                showLogin: true,
                login: true,
                //showRegister: false,
                //register: false,
                tokenExist: false,
                userName: '',
                email: '',
                password: ''
            }
        case "REGISTER_FORM_OPEN":
            return {
                ...state,
                //showLogin: false,
                //login: false,
                showRegister: true,
                register: true,

            }
        case "REGISTER_FORM_CLOSE":
            return {
                ...state,
                showRegister: false,
                register: false,
                //login: false,
                passwordVisible: false
            }
        case "SHOW_PASSWORD":
            return {
                ...state,
                //showPassword: !state.showPassword,
                passwordVisible: !state.passwordVisible
            }
        case "UPDATE_USER_NAME":
            return {
                ...state,
                userName: action.userName
            }
        case "UPDATE_EMAIL":
            return {
                ...state,
                email: action.email,
                emailValid: state.emailValid = state.validEmailRegExp.test(action.email)
            }
        case "UPDATE_PASSWORD":
            return {
                ...state,
                password: action.password,
                passwordValid: action.password.length >= 6
            }
        case "UPDATE_TOKEN":
            return {
                ...state,
                token: action.token,
                tokenExist: !state.tokenExist,
                password: !state.tokenExist ? '' : state.password,
                email: !state.tokenExist ? '' : state.email
            }
        case "SET_FRIENDS_DATA":
            return {
                ...state,
                friends: {
                    ...state.friends,
                    data: action.data
                },
                rowsCount: action.data.length
            }
        case "UPDATE_FRIENDS_DATA":
            return {
                ...state,
                friends: {
                    ...state.friends,
                    data: state.data[action.index] = action.data
                }
            }
        case "SET_ELEMENTO":
            return {
                ...state,
                elemento: action.elemento
            }
        case "SET_ROW_COUNT":
            return {
                ...state,
                rowsCount: action.rowsCount
            }
        case "SET_OPEN_DRAWER":
            return {
                ...state,
                openDrawer: action.openDrawer
            }
        case "SET_USER_ROWS":
            return {
                ...state,
                userRows: action.userRows
            }
        case "SET_USER_MODULES":
            return {
                ...state,
                userModules: action.userModules
            }
        case "SET_PROFILE_DATA":
            return {
                ...state,
                loadProfileData: action.loadProfileData
            }
        case "SET_FILTER_OPTIONS":
            return {
                ...state,
                filterOptions: !state.filterOptions
            }
        case "SET_FRIEND_SELECTED":
            return {
                ...state,
                friendSelected: action.friendSelected
            }
        case "SET_FRIEND_DETAILS":
            return {
                ...state,
                friendDetails: action.friendDetails
            }
        case "SET_SHOW_DETAILS":
            return {
                ...state,
                showDetails: !state.showDetails
            }
        case "SET_SELECTED_ROW":
            return {
                ...state,
                selectedRow: action.selectedRow
            }
        case "SET_FRIEND_DATE_SELECTED":
            return {
                ...state,
                friendDateSelected: action.friendDateSelected
            }
        case "SET_CURSOR_POSITION":
            return {
                ...state,
                cursorPosition: action.cursorPosition
            }
        case "SET_ANCHOR_REF":
            return {
                ...state,
                anchorRef: action.anchorRef
            }
        case "SET_REFERENCIA":
            return {
                ...state,
                referencia: action.referencia
            }
        case "SET_DATA_USERS":
            return {
                ...state,
                dataUsers: action.data,
                usersRowsCount: action.data.length
            }
        case "SET_DATA_USER_SELECTED":
            return {
                ...state,
                dataUserSelected: action.dataUserSelected
            }

        default: return state;
    }
};

export default reducer;
