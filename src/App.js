import React from 'react';
import clsx from 'clsx';

import axios from "axios";

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
import DataTable from './components/DataTable';
import TableTest from './components/TableTest';
import { Copyright } from './components/Copyright';
import UsersAll from './components/UsersAll';
import ComponentFriends from './components/ComponentFriends';
import ComponentUsers from './components/ComponentUsers';

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

// import './components/remotetable.css';

import { useEffect } from "react";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
import MessageBox from './components/MessageBox';
import UsersCard from './components/UsersCard';

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

    /**cargando los detalles del amigo seleccionado... */
    async function loadDetailsFromDataSelected(id) {
        try {
            axios.defaults.headers.common['Authorization'] = '';
            const res = await axios.get('http://localhost:5000/api/friends/' + id);
            console.log('res.data.success', res.data.success)
            if (res.data.success === 1) {
                //console.log(res.data.result[0].user_name)
                //props.messageOpen(res.data.user.userName + ' ' + res.data.message, 'success')
                //props.updateToken(res.data.token);
                let rows = res.data.rows;
                let arrayModules = [];
                //console.log('res', res.data.rows)
                if (rows.length > 0) {
                    //props.setFriendDetails(rows)
                    //props.setFriendDateSelected(0);
                    props.setFriendDetails(rows);
                    props.setFriendDateSelected(0);
                } else {
                    //props.setFriendDateSelected(null); props.setFriendDetails([])
                    props.setFriendDateSelected(null); props.setFriendDetails([]);
                }
                /*
                rows.forEach(element => {
                    //console.log(element.module_id)
                    arrayModules.push([element.module_id, element.module_display_name, element.module_icon, element.module_name, element.module_access])
                })
                arrayModules.sort((a, b) => a[0] - b[0]);
                */
                console.log('DETALLES???', props.friendDetails.length)
            } else {
                props.messageOpen(res.data.data, 'error')
                console.log('NO DATTTTtttta', res.data.data)
            }
        } catch { props.messageOpen('Connection refused.', 'error') }
    }

    //Cuando ocurre un onClick sobre un campo de la tabla
    function rowClickHanddle(evt, rowData) {
        console.log('CORRECTO!!!!!!!', rowData.id);
        // await props.setSelectedRow(rowData.tableData.id);
        // await props.setFriendSelected(rowData);
        // props.setFriendDateSelected(null);
        props.setSelectedRow(rowData.tableData.id);
        props.setFriendSelected(rowData);
        props.setFriendDateSelected(null);
        console.log('A cargar Datos de DETALLE', rowData);
        //console.log('A cargar Datos de DETALLE', props.friends.data.length);
        loadDetailsFromDataSelected(rowData.id);
        //console.log(props.friendSelected.firstname + ' ' + props.friendSelected.middlename + ' ' + props.friendSelected.lastname);
    }


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
                        <Container id="principal-container" maxWidth={false}>
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

                            <Route exact path="/friends" render={() => (<RemoteTable daColor='#e3f2fd' />)} />
                            <Route exact path="/friendsDetails" render={() => (
                                /*<DataTable
                                    daColor='#e2fd'
                                    data={props.data}
                                    setData={props.setFriendsData}
                                    columns={props.columns}
                                    rowsCount={props.rowsCount}
                                    setDataDetails={props.setFriendDetails}
                                    setDataIndexSelected={props.setSelectedRow}
                                    setDataSelected={props.setFriendSelected}
                                    setDataDetailIndexSelected={props.setFriendDateSelected}
                                    httpToServer="http://localhost:5000/api/friends/"//posible no necesario pq no se necesite una primera carga
                                    rowClickHandlle={rowClickHanddle}
                                />*/
                                <ComponentUsers />)} />

                            <Route exact path="/users" component={UsersAll} />
                            <Route exact path="/usersModules" component={UsersCard} />


                        </Container>
                        <ScrollTop {...props}>
                            <Fab style={{ color: '#fafafa', backgroundColor: 'rgb(11 171 131 / 12%)' }} size="small" aria-label="scroll back to top">
                                <KeyboardArrowUpIcon style={{ color: 'rgb(20 17 232)' }} />
                            </Fab>

                        </ScrollTop>
                        <h1 style={{ minWidth: "310px", maxWidth: "310px", position: 'fixed' }}></h1>
                    </main>

                </React.Fragment>

            </Router>
        </div>
    );
}

const mapStateToProps = state => ({
    columns: state.columns,
    token: state.token,
    data: state.friends.data,
    filterOptions: state.filterOptions,
    friendSelected: state.friendSelected,
    friendDetails: state.friendDetails,
    user: state.user,
    selectedRow: state.selectedRow,
    showDetails: state.showDetails,
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
    },
    setFriendsData(data) {
        dispatch({
            type: "SET_FRIENDS_DATA",
            data
        })
    },
    updateFriendsData(newData, index) {
        dispatch({
            type: "UPDATE_FRIENDS_DATA",
            newData,
            index
        })
    },
    setElemento(rowsCount) {
        dispatch({
            type: "SET_ROWS_COUNT",
            rowsCount
        })
    },
    setFilterOptions(filterOptions) {
        dispatch({
            type: "SET_FILTER_OPTIONS",
            filterOptions
        })
    },
    setFriendSelected(friendSelected) {
        dispatch({
            type: "SET_FRIEND_SELECTED",
            friendSelected
        })
    },
    setFriendDetails(friendDetails) {
        dispatch({
            type: "SET_FRIEND_DETAILS",
            friendDetails
        })
    },
    setShowDetails() {
        dispatch({
            type: "SET_SHOW_DETAILS"
        })
    },
    setSelectedRow(selectedRow) {
        dispatch({
            type: "SET_SELECTED_ROW",
            selectedRow
        })
    },
    setFriendDateSelected(friendDateSelected) {
        dispatch({
            type: "SET_FRIEND_DATE_SELECTED",
            friendDateSelected
        })
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(App);
