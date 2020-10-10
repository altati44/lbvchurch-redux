import React from 'react';
import ReactDOM from 'react-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Draggable from 'react-draggable';



const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const ModalFriend = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
        >


            <Dialog style={{ top: "-300px", boxShadow: "none" }} onClose={hide} aria-labelledby="customized-dialog-title" disableBackdropClick={true} open={isShowing}>
                <div className="handle" style={{ cursor: 'pointer' }}>
                    <DialogTitle id="customized-dialog-title" onClose={hide}>
                        Modal title
                </DialogTitle>
                </div>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                        lacus vel augue laoreet rutrum faucibus dolor auctor.
                     </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={hide} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Draggable>
    </React.Fragment>, document.body
) : null;

export default ModalFriend;
/*
N4t4ly281014
ListIcon, Ballot, PeopleAlt, Build, ViewModule

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

DELETE FROM`lbvdatabase`.`lbv_friends` WHERE`id` IN (91, 93);
   DAUR
00 0000
01 0001
02 0010
03 0011
04 0100
05 0101
06 0110
07 0111
08 1000
09 1001
10 1010
11 1011
12 1100
13 1101
14 1110
15 1111

*/


