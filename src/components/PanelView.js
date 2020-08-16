import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        color: 'blue',
        //flexGrow: 1,
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(26),
            height: theme.spacing(26),
        },

    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function PanelView() {
    const classes = useStyles();
    const onStart = () => {
        //this.setState({ activeDrags: ++this.state.activeDrags });
    };

    const onStop = () => {
        //this.setState({ activeDrags: --this.state.activeDrags });
    };

    const handleEvent = (e, data) => {
        console.log('Event Type', e.type);
        console.log(e, data);
    }

    return (

        <Draggable
            axis="both"
            handle=".handlely"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            positionOffset={{ x: '100%', y: '50%' }}
        >

            <div className={classes.root} style={{ backgroundColor: 'white', position: 'absolute', zIndex: '1000', position: 'fixed' }}>
                <div>
                    <Grid container alignItems="center">
                        <div className="handlely" style={{ cursor: 'move' }}>
                            <Grid item xs color='primary'>
                                <Typography gutterBottom variant="h4">
                                    Toothbrush
                                     <hr />
            </Typography>
                            </Grid>
                        </div>
                        <Grid item>
                            <Typography gutterBottom variant="h6">
                                $4.50
            </Typography>
                        </Grid>
                    </Grid>
                    <Typography color="textSecondary" variant="body2">
                        Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the
                        hall.
                        
                        trgwergasd
        </Typography>
                </div>





            </div>
        </Draggable>

    );
}