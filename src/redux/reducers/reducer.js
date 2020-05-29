
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
            return {
                ...state,
                login: !state.login,
                register: !state.register,
                mostrar: false
            }
        case 'CHECK_EMAIL':
            //const validEmailRegExp = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

            return {
                ...state,
                emailValid: state.validEmailRegExp.test(action.email)
            }
        case 'CHECK_PASSWORD':
            console.log(action.password.length + '>>>pasa')
            return {
                ...state,
                passwordValid: action.password.length >= 6
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
                isLoggedIn: true
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
                email: action.email
            }
        case "UPDATE_PASSWORD":
            return {
                ...state,
                password: action.password
            }
        case "UPDATE_TOKEN":
            return {
                ...state,
                token: action.token,
                tokenExist: !state.tokenExist,
                password: !state.tokenExist ? '' : state.password,
                email: !state.tokenExist ? '' : state.email
            }

        default: return state;
    }
};

export default reducer;
