import React, { forwardRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';

import Tooltip from '@material-ui/core/Tooltip';


import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

import PropTypes from 'prop-types';

import Draggable from 'react-draggable';
import { Resizable } from "re-resizable";

import TextField from '@material-ui/core/TextField';

import FriendsNotes from './FriendsNotes';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import dateFormat from 'dateformat';

import { connect } from "react-redux";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
        color: '#3d5afe'
    },
    title: {
        fontSize: 12
    },
    titleNotes: {
        fontSize: 12,
        backgroundColor: 'green',
        color: 'white',
        alignItems: 'center',
        height: '30px',
        width: '240px'
    },
    pos: {
        marginBottom: 12,
    },
    listDate: {
        width: '100%',
        //backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),

    },
    paper: {
        padding: theme.spacing(0),
        margin: 'auto',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    appBar: {
        MinHeight: '30px'
    }
}));



function CardDetails(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•❤👌😁🤦‍♀️•°</span>;
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);


    //evt.clientX + ',' + evt.clientY;
    const [open, setOpen] = React.useState(false);
    const [showing, setShowing] = React.useState(false);
    //const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = () => {
        setOpen((prev) => !prev);
        if (open) { setShowing(true) }
        else { setShowing(false) }
    };
    const handleClickAway = () => {
        console.log('click AWAY')
    };

    const handleListDateChange = (event, index) => {

        //props.setFriendDateSelected(index);
        console.log('status: CHANGE')
    };

    const handleCloseNotes = () => {
        setOpen((prev) => !prev);
        setShowing(!showing);
        props.setReferencia("none");
        //console.log("handleCloseNotes+++AL CERRAR: OPEN", open);
        //console.log("Showing", showing);
    }

    const handleNotesClick = (event, index) => {
        //console.log("handleNotesClick__1: OPEN", open);
        const xx = event.screenX - event.clientX + 20;
        //console.log("screen", document.body.clientWidth, document.body.offsetHeight);
        //console.log("client", event.clientX, event.clientY);

        //console.log('DOCUMENTO...', document.documentElement.clientWidth)
        {/*
        const cursorPosition = {
            posX: event.clientX,
            posY: event.clientY
        }
    */}
        //props.setCursorPosition(cursorPosition);
        //notesPosition = { x: event.clientX, y: event.clientY };
        setOpen((prev) => !prev);
        //console.log('cursorPosition:', props.cursorPosition);

        setAnchorEl(event.currentTarget);
        setShowing(true);
        props.setFriendDateSelected(index);
        //console.log('AnchorEl-FALSE', anchorEl)

        //console.log("handleNotesClick__2: OPEN", open);
        //console.log("Showing", showing);
    };

    const handleListDateClick = (event, index) => {
        props.setFriendDateSelected(index);
        //console.log('status: ' + index, props.friendDetails[index].status)
    };

    //para que aparezca seleccionado el primer elemento de la lista de date cuando se pinte los detalles 
    function listDataSelect(index) {
        if (props.friendDetails.length > 0) {
            console.log('Mayor que ZERO....')
            if (props.friendDateSelected != null) {
                //props.friendDateSelected === index || index === 0 ? true : false 
                if (props.friendDateSelected === index) {
                    //handleListDateClick(null, index)
                    //props.setFriendDateSelected(index);
                    return true
                }
                else return false
            } else {
                if (index === 0) {
                    if (props.friendDetails.length > 0) {
                        props.setFriendDateSelected(index)
                        return true
                    } else {
                        props.setFriendDateSelected(null);
                        return false
                    };//da error cuando actualizo esto.....

                }
                else return false
            }
        } else {
            props.setFriendDateSelected(null);
        }

    }

    const handleClose = () => {
        //console.log('anchorEl.............', anchorEl)
        setAnchorEl(null);
    };

    const clickTextArea = () => {

    }
    const dragNotes = () => {
        props.setAnchorRef(true);
    }

    //transport_select.onchange = function () { toggleSelect(transport_select_id); };

    //let reverseFriendDetails = props.friendDetails.reverse();
    //const reverseIndex = (index - (props.friendDetails.length - 1)) * -1 //ordeno por lo mas reciente...

    function MaxHeightTextarea() {
        const index = props.friendSelected.tableData.id;

        console.log('selectedIndex: ' + selectedIndex, props.friendDetails);
        return (
            <TextareaAutosize
                rowsMax={4}
                aria-label="Status"
                placeholder="Status empty..."
                defaultValue={(props.friendDateSelected != undefined) ? props.friendDetails[props.friendDateSelected].status : ""}
            />
        );
    }

    const ValidationTextField = withStyles({
        root: {
            '& input:valid + fieldset': {
                borderColor: 'green',
                borderWidth: 2,
            },
            '& input:invalid + fieldset': {
                borderColor: 'red',
                borderWidth: 2,
            },
            '& input:valid:focus + fieldset': {
                borderLeftWidth: 6,
                padding: '4px !important', // override inline-style
            },
        },
    })(TextField);

    return (
        <Card className={classes.root} variant="outlined" >  {/**style={{ position: 'fixed' }}fixed... para que se mantenga siempre visible... */}
            {/**Notes window */}

            <ClickAwayListener onClickAway={handleClickAway}>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}

                    anchorReference="anchorEl" //anchorPosition,none: los combino para cuando se mueva la ventana se quede en ese lugar
                    anchorPosition={{
                        left: 0,
                        top: 0
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >

                    <React.Fragment>
                        <CssBaseline />
                        <AppBar position="sticky" className={classes.appBar} style={{ backgroundColor: 'green' }}>
                            <Toolbar style={{ minHeight: '33px', paddingRight: '2px', paddingLeft: '4px' }}>
                                <Grid className={classes.titleNotes} container item xs={11} justify="flex-start" alignItems="center" >
                                    <Typography noWrap align="left" color="inherit" style={{ marginLeft: '12px', marginTop: '3px', alignItems: "center", height: '100%' }}>
                                        Notes
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} container justify="flex-end" alignItems="center" style={{ align: 'right' }}>
                                    <div className={classes.paper}>
                                        <Tooltip title="Close">
                                            <IconButton size="small"
                                                id="botonotes"
                                                onClick={handleCloseNotes}//{(event) => handleNotesClick(event, null)}
                                                color="inherit"
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                        <AppBar />
                        <TextField
                            id="outlined-multiline-static"
                            //label="Multiline"
                            multiline
                            InputProps={{ disableUnderline: true }}
                            rows={12}
                            defaultValue={(props.friendDateSelected != null) && (props.friendDetails.length > 0) ? props.friendDetails[props.friendDateSelected].notes : ""}
                            placeholder="Empty notes"
                            //variant="outlined"
                            style={{ border: 'none', width: '100%', padding: '12px' }}
                        />
                    </React.Fragment>
                </Popover>

            </ClickAwayListener>

            <CardContent>

                <Typography variant="h6" style={{ color: "inherit" }}>
                    {(props.friendDateSelected != null && props.friendDetails[props.friendDateSelected].status != null) ?
                        `Status: ${props.friendDetails[props.friendDateSelected].status}` : "No Status"}
                </Typography>
                {/**
                <ValidationTextField
                    className={classes.margin}
                    //label="CSS validation style"
                    dense
                    required
                    variant="outlined"
                    defaultValue="Visits"
                    id="validation-outlined-input"
                />
 */}
                {props.friendDetails.length > 0 && <div>

                    <Divider style={{ backgroundColor: "#00A000", height: "3px" }} />



                    <List className={classes.listDate} onFocus={(event) => console.log('CAMBIANDO')}>

                        {props.friendDetails.map((value, index) => (

                            <ListItem key={index} role={undefined}
                                dense
                                button
                                style={{ backgroundColor: (props.friendDateSelected === index) ? '#e3f2fd' : '' }}
                                selected={(index === 0 && props.friendDateSelected != null) ? listDataSelect(0) : null} /**Esto me da un error de renderizado y update */
                                onClick={(event) => handleListDateClick(event, index)}
                                autoFocus={true}

                            >
                                <ListItemText id={"labelId" + index} primary={dateFormat(value.date, "ddd, mmm dS, yyyy, h:MM TT")} />
                                <ListItemSecondaryAction>
                                    <Tooltip title="Open Notes">
                                        <IconButton edge="end" aria-label="comments"
                                            onClick={open ? null : (event) => handleNotesClick(event, index)}/*{(event) => handleNotesClick(event, index)}*/
                                            size="small"
                                        >
                                            <CommentIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                        }
                    </List>
                </div>}
            </CardContent>
            <CardActions>
                {/*<Button size="small">Learn More</Button>*/}
            </CardActions>
        </Card >
    );
}

const mapStateToProps = state => ({
    friendDetails: state.friendDetails,
    friendSelected: state.friendSelected,
    friendDateSelected: state.friendDateSelected,
    cursorPosition: state.cursorPosition,
    anchorRef: state.anchorRef,
    referencia: state.referencia
});

//actualiza la forma como saldra el mensaje
const mapDispatchToProps = dispatch => ({
    setFriendDateSelected(friendDateSelected) {
        dispatch({
            type: "SET_FRIEND_DATE_SELECTED",
            friendDateSelected
        })
    },
    setCursorPosition(cursorPosition) {
        dispatch({
            type: "SET_CURSOR_POSITION",
            cursorPosition
        })
    },
    setAnchorRef(anchorRef) {
        dispatch({
            type: "SET_ANCHOR_REF",
            anchorRef
        })
    },
    setReferencia(referencia) {
        dispatch({
            type: "SET_REFERENCIA",
            referencia
        })
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);
