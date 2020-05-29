

const addToCart = product => {
    return {
        type: "ADD_TO_CART",
        product: product
    }
}

const removeFromCart = product => {
    return {
        type: "REMOVE_FROM_CART",
        product: product
    }
}

const setRegister = register => {
    return {
        type: "SET_REGISTER",
        register: register
    }
}

const setLogin = login => {
    return {
        type: "LOG_IN",
        login: login
    }
}

const checkEmail = emailValid => {
    return {
        type: "CHECK_EMAIL",
        emailValid: emailValid
    }
}

const checkPassword = passwordValid => {
    return {
        type: "CHECK_PASSWORD",
        passwordValid: passwordValid
    }
}

const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

const closeSnackbar = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});


export {
    addToCart,
    removeFromCart,
    setRegister,
    checkEmail,
    checkPassword,
    setLogin,
    enqueueSnackbar,
    closeSnackbar,
    removeSnackbar
};