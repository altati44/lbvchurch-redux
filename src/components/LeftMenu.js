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
import RemoteTable from './RemoteTable';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from "react-redux";

const drawerWidth = 240;

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
        //paddingBottom: theme.spacing(2),
        backgroundColor: '#2196f3',
    },
    toolbar2: {
        //minHeight: 128,
        //alignItems: 'flex-start',
        //paddingTop: theme.spacing(1),
        //paddingBottom: theme.spacing(2),
        //backgroundColor: '#2196f3',
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

function LeftMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>

            <Router>

                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className={classes.toolbar} >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" noWrap>
                            Lake Buena Vista Friends
                    </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <React.Fragment>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <Toolbar className={classes.toolbar2} id="main-bar" />{/**solo para regresar el scroll */}
                        <Container>
                            {/**Dentro va todo el contenido de la Alicacion */}


                            <RemoteTable />






                        </Container>
                        <ScrollTop {...props}>
                            <Fab color="secondary" size="small" aria-label="scroll back to top">
                                <KeyboardArrowUpIcon />
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
    userName: state.userName,
    login: state.login,
    register: state.register,
    showLogin: state.showLogin,
    showRegister: state.showRegister,
    isLoggedIn: state.isLoggedIn,
    messageBoxData: state.messageBoxData
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);