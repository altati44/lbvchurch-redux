import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles } from '@material-ui/core/styles';
//import { SnackbarProvider } from 'notistack';
//import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '30%',
        '& > * + *': {
            marginTop: theme.spacing(6),
        },
    },
}));

const MessageBox = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                TransitionComponent={Slide}
                open={props.messageBoxData.open}
                autoHideDuration={4000}
                onClose={props.messageClose}
                message='SnackBar'
            >
                <SnackbarContent style={{
                    backgroundColor: props.messageBoxData.smsType,
                    height: 'auto', /*lineHeight: '28px', whiteSpace: 'pre-line' padding: 24*/

                }}

                    message={
                        <React.Fragment>
                            {/*<DoneAllIcon />*/}
                            {props.messageBoxData.message}
                        </React.Fragment>
                    }
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit"
                                onClick={() => props.messageClose()}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                >

                </SnackbarContent>
            </Snackbar>
        </div >
    )
};

const mapStateToProps = (state) => {
    return {
        messageBoxData: state.messageBoxData
    }
};

const mapDispatchToProps = dispatch => ({
    messageClose() {
        dispatch({
            type: "MESSAGE_CLOSE"
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);

