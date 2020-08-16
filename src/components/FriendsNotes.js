import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        zIndex: 1,
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FriendsNotes() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [showing, setShowing] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
        if (open) { setShowing(true) }
        else { setShowing(false) }
    };

    const handleClickAway = () => {

    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <button type="button" onClick={open ? null : handleClick}>
                    Open menu dropdown
        </button>
                {open ? (
                    <div>
                        <div className={classes.dropdown}>
                            Click me, I will stay visible until you click outside.
                            <div onClick={handleClick}>
                                close
                    </div>
                        </div>

                    </div>

                ) : null}
            </div>
        </ClickAwayListener>
    );
}