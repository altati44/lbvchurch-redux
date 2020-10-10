import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import { withStyles } from "@material-ui/core/styles";

//import './UserCard.scss';



const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 350,
        maxHeight: 500,
        width: 350,
        //height: 300
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    tipographie: {
        color: '#FFFFFF'
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: "#08f58670",
        color: 'white',
        position: 'relative',
        //transform: 'skewX(.001deg)',
        transform: 'rotate(-6deg)',
        boxShadow: '0 2px 2px 2px rgba(blue, 0.4)',
        border: '2px solid green',
        padding: "0px",
        //transform: 'rotateX(7deg) translateY(-6px)',
        //backgroundImage: 'linearGradient(120deg, #f6d365 0 %, #fda085 100 %)',
        transform: 'rotateX(-7deg) translateY(- 1px) scale(1.05)',
    },
    /*focusHighlight: {
        //backgroundColor: 'red',
        //boxShadow: "0px 0px 18px - 3px rgba(143, 143, 143, .50)",
        '&:hover': {
            backgroundColor: 'rgb(0 30 245 / 33%)',
            boxShadow: '0px 0px 20px -3px rgba(143, 143, 143, .75)'
        },

    },*/
}));

export default function UserCard(props) {
    props = {
        ...props,
        cardId: props.cardId,
        cardUserName: props.cardUserName,
        cardUserEmail: props.cardUserEmail,
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
        <Card className="classes.root">
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {props.cardAvatarLetter}
                        </Avatar>
                    }
                    action={<div>
                        <IconButton aria-label="settings" >
                            <MoreVertIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                    }
                    title="jjkjjjjjjjj"
                    subheader={props.cardUserCreated}
                />

                <CardContent >
                    <Typography variant="body2" color="textSecondary" component="p">
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

            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
          </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                        and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                        pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                        medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                        again without stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
          </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
