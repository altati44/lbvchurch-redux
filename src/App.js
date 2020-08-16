import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import RemoteTable from './components/RemoteTable';
import TableTest from './components/TableTest';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import ListIcon from '@material-ui/icons/List';

import Login from './components/Login';
import Register from './components/Register';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import renderHTML from 'react-render-html';
import InnerHTML from 'dangerously-set-html-content';
import ReactHTMLConverter from 'react-html-converter/node';
import Interweave from 'interweave';
import dangerouslySetInnerHTML from 'dangerously-set-inner-html';
import Parser from 'html-react-parser';
import Icon from '@material-ui/core/Icon';
import { Ballot, PeopleAlt, Build, ViewModule } from '@material-ui/icons';



import { useEffect } from "react";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
import MessageBox from './components/MessageBox';

const drawerWidth = 240;



//...del App menubar
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        //position: 'fixed',
        bottom: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.text.primary,
    },
    arowScroll: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    toolbar: {
        //minHeight: 128,
        //alignItems: 'flex-start',
        //paddingTop: theme.spacing(1),
        //paddingBottom: theme.spacing(2),2196f3
        backgroundColor: '#4939d4',
    },
    toolbar2: {
        //minHeight: 128,
        //alignItems: 'flex-start',
        //paddingTop: theme.spacing(1),
        //paddingBottom: theme.spacing(2),
        //backgroundColor: '#4939d4',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: false,
        threshold: 100,
        //position: 'right'
    });
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#main-bar');
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.arowScroll}>
                {children}
            </div>
        </Zoom>
    );
}
//del App menubar...

function App(props) {
    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerOpen = () => {
        props.setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        props.setOpenDrawer(false);
    };

    //..............Right Menu and popup, log out, etc. no puedo ponerlo en redux por el anchorEl que es muy largo...
    const UserMenu = () => {
        //menu para user
        const [anchorEl, setAnchorEl] = React.useState(null);
        const openMenu = Boolean(anchorEl);

        const handleMenu = (event) => {
            //let sss = Object.assign(event.currentTarget);
            setAnchorEl(event.currentTarget);
            //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
            //console.log([], Object.assign(props.data))
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <React.Fragment>
                <div>
                    <Grid container spacing={1} style={{ alignItems: 'center' }}>
                        <Grid item xs={10} style={{ align: 'right' }} >
                            <Typography noWrap align='right' style={{ color: 'rgb(238, 229, 214)' }}>
                                Welcome {props.user.userName}!
                        </Typography>
                        </Grid>
                        <Grid item xs={2} >
                            <IconButton
                                id="icon-auth"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(event) => { handleMenu(event) }}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Menu
                        id="menu-appbar"
                        elevation={8}
                        anchorEl={anchorEl}//{anchorEl}
                        getContentAnchorEl={null}
                        //anchorReference={document.body.getElementsByTagName("icon-auth")}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openMenu}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={null}>Profile</MenuItem>
                        <MenuItem onClick={props.logOut}>Logout</MenuItem>
                    </Menu>
                </div >
            </React.Fragment>
        )
    }
    let cargaProfile = props.loadProfileData;//para hacer el juego de cargarlo solo una vez y no cada vez que....
    //Lo uso para renderizar cada vez que se cargue el profile del usuario logeado
    useEffect(() => {
        {/*Cargo los datos del usuario: menu, modulos, etc.*/ }
        if (cargaProfile) {
            props.setProfileData(false);
            console.log('desde APP:  ', props.userModules)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.loadProfileData]);//[] para renderizar solo cuando cambie loadProfileData

    //poner en la store ...PENDIENTE
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log(event.target.tagName.value, index)
    };

    let arrayModules = [];
    let arrayModulesSort = [];
    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    var td = htmlToElement('<ListIcon/>')
    const html = `<ListIcon/>`;
    //const converter = new ReactHTMLConverter();
    const someHtml = '<div><strong>blablabla<strong><p>another blbla</p/></div>';


    //para poner icono al menu desplegable de la izquierda
    const IconFunction = (icon) => {
        switch (icon) {
            case 'ListIcon':
                return <ListIcon />
            case 'Ballot':
                return <Ballot />
            case 'PeopleAlt':
                return <PeopleAlt />
            case 'Build':
                return <Build />
            case 'ViewModule':
                return <ViewModule />
            default: return null
        }
    }

    //DEL.........PRINCIPAL...................... APP
    return (
        <div className={classes.root}>

            {/*< LoggedStatus />para manejar que formulario de registro o de login renderizo*/}
            {!props.isLoggedIn && <Login />}
            {(!props.isLoggedIn && props.register) && <Register />}


            <Router>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: props.openDrawer,
                    })}
                >
                    <Toolbar className={classes.toolbar} >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, props.openDrawer && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap className={classes.title}>
                            Lake Buena Vista Friends
                    </Typography>
                        {/*Icon de user and welcome*/}
                        {props.isLoggedIn && (<UserMenu />

                        )}

                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={props.openDrawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>




                        {/*//aparecen los Link*/}
                        {props.userModules.map((text, index) => (
                            <Link to={text[3]} key={text[0]} style={{ textDecoration: 'none', color: 'black' }} >
                                <ListItem
                                    button key={text[0]}
                                    selected={selectedIndex === text[0]}
                                    onClick={(event) => handleListItemClick(event, text[0])}
                                >
                                    <ListItemIcon >{IconFunction(text[2])}</ListItemIcon>
                                    <ListItemText primary={text[1]} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    {/*<Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>*/}
                </Drawer>
                <React.Fragment>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: props.openDrawer,
                        })}
                    >
                        <Toolbar className={classes.toolbar2} id="main-bar" />{/**solo para regresar el scroll */}
                        <Container>
                            <div >      {/*div del MessageBox*/}
                                <MessageBox
                                    on_Close={props.messageClose}
                                    on_Open={props.messageBoxData.open}
                                    body_message={props.messageBoxData.message}
                                    type_message={props.messageBoxData.smsType}
                                />
                            </div>
                            {/**Dentro va todo el contenido de la Aplicacion */}

                            {/*
        <Route exact path="/" component={FriendsList} />
        <Route exact path="/create" component={CreateFriend} >
          <Route exact path="/create" component={FriendsList} />
        </Route>

        */}

                            <Route path="/friends" component={RemoteTable} />
                            <Route path="/usersModules" component={TableTest} />


                        </Container>
                        <ScrollTop {...props}>
                            <Fab style={{ color: '#fafafa', backgroundColor: 'rgba(0, 0,56, 0.2)' }} size="small" aria-label="scroll back to top">
                                <KeyboardArrowUpIcon style={{ color: '#e83c11' }} />
                            </Fab>
                        </ScrollTop>
                    </main>
                </React.Fragment>
            </Router>
        </div>
    );
}

const mapStateToProps = state => ({
    mostrar: state.mostrar,
    user: state.user,
    login: state.login,
    register: state.register,
    showLogin: state.showLogin,
    showRegister: state.showRegister,
    isLoggedIn: state.isLoggedIn,
    messageBoxData: state.messageBoxData,
    data: state.friends.data,
    rowsCount: state.rowsCount,
    openDrawer: state.openDrawer,
    userRows: state.userRows,
    tokenExist: state.tokenExist,
    loadProfileData: state.loadProfileData,
    userModules: state.userModules
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
    loggedIn() {
        dispatch({
            type: "LOGGED_IN"
        })
    },
    logOut() {
        dispatch({
            type: "LOG_OUT"
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
    setFriendsData(data) {
        dispatch({
            type: "SET_FRIENDS_DATA",
            data
        })
    },
    setElemento(rowsCount) {
        dispatch({
            type: "SET_ROWS_COUNT",
            rowsCount
        })
    },
    setOpenDrawer(openDrawer) {
        dispatch({
            type: "SET_OPEN_DRAWER",
            openDrawer
        })
    },
    setProfileData(loadProfileData) {
        dispatch({
            type: "SET_PROFILE_DATA",
            loadProfileData
        })
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(App);
