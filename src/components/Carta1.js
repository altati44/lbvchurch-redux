import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Grid } from '@material-ui/core';

import './UserCard.scss';
import { Tooltip } from '@material-ui/core';
import { HdRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        width: 320,
        borderRadius: '3%',
        //boxShadow: '23px 3px 6px 6px rgba(#000000, )'//'0px 1rem 1.5rem rgba(black, 0.5)',


    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#054615',//#054615',"#585858",
        color: 'white',
        //backgroundColor: red[500],
        transform: 'rotate(-6deg) translateY(-35px) translateX(-12px) scale(1)',
        //zIndex: 3000 + ' !important',
        position: 'absolute',
        boxShadow: '0 2px 2px 2px rgba(blue, 02)',
        border: `2px solid #FFFFFF`,
        padding: "0px",
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    tipographyColorWhite1: {
        //color: '#945d0afa',
        maxWidth: '13em',
        whiteSpace: 'noWrap',
        overflow: "hidden",
        textOverflow: "ellipsis",
        position: 'absolute',
        //...theme.typography.button,//para letras mayusculas
        marginBottom: '4px',
        //alignItems: 'right',
    },
    tipographyColorWhite2: {
        color: '#000000',
        maxWidth: '10em',
        whiteSpace: 'noWrap',
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginBottom: '4px',
        //zIndex: '1501 +  !important',
        //variant: 'subtitle1',
        fontStyle: 'italic',
        fontSize: 12,

    },
}));

export default function Carta1(props) {

    props = {
        ...props,
        cardId: props.cardId,
        cardUserName: props.cardUserName,
        cardUserEmail: props.cardUserEmail,
        cardUserRole: props.cardUserRole,
        cardAvatarLetter: props.cardAvatarLetter,
        cardUserCreated: props.cardUserCreated,
        cardClickHandlle: props.cardClickHandlle
    }

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root} elevation={3}
            style={{
                boxShadow: 'rgba(99, 90, 90, 0.79) 0px 0px 0px 0px, rgb(74, 64, 64) 0 0 0px 0px, rgb(91 112 160/89%) 1px 0px 20px 4px'
            }}
        >
            <div >
                <CardHeader style={{ padding: '4px' }}
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.cardAvatarLetter}
                        </Avatar>
                    }
                    action={
                        <IconButton style={{ color: '#000000' }} aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <div
                            style={{
                                borderRadius: '5px 25px 25px 0px', paddingLeft: 36, paddingTop: '2px', backgroundColor: '#FFFFFF', boxShadow: '0 2px 2px 2px rgba(blue, 02)',
                                border: '2px solid #054615'
                            }}
                        >

                            <Tooltip title={props.cardUserName.length >= 20 ? props.cardUserName : ''} aria-label="add"
                                style={{ zIndex: 1501 + ' !important', position: 'relative' }}>
                                <Typography variant='subtitle1' className={classes.tipographyColorWhite1} >{props.cardUserName}</Typography>

                            </Tooltip>

                        </div>
                    } />

                <CardContent style={{ paddingTop: '2px' }}>
                    <Grid container direction="row" justify="space-between" alignItems="center" spacing={0}>
                        <Grid item xs={9}><hr style={{ border: 'none', borderRadius: '25px 25px 25px 25px', color: '#d7ccc8', backgroundColor: '#d7ccc8', height: '2px', width: '90%', alignItems: 'right' }}></hr>

                        </Grid>
                        <Grid item xs={3} style={{ textAlign: 'center' }}>
                            <Typography className={classes.tipographyColorWhite2} >{props.cardUserCreated}</Typography>

                        </Grid>

                    </Grid>

                    <Grid item xs={12} style={{ color: '#FFFFFF' /*direction: 'ltr'*/, alignItems: "center" }}>
                        <Typography style={{ textTransform: 'uppercase', width: 'auto', fontWeight: 'bold', color: '#1a237e' }}>{props.cardUserRole}</Typography>

                    </Grid>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {props.cardUserEmail}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}
//https://www.cssmatic.com/es/box-shadow