import React, { useEffect } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import UserCard from './UserCard';
import dateFormat from 'dateformat';
import Carta1 from './Carta1';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        //height: 250,
        //width: 250,
        //backgroundColor: 'blue',
        backgroundColor: 'red'
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function UsersCard(props) {
    let arreglo = [];

    const classes = useStyles();
    //muestra los datos de la tabla friends cuando el componente es renderizado
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users/")
            .then(res => {
                props.setDataUsers(res.data.result);
                arreglo = res.data.result;
                console.log('Arreglo,,,', arreglo)
                props.setDataUserSelected(res.data.result[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);//[] para renderizar solo una vez



    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.root}
            spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>

                    {props.data.map(obj => (

                        < Grid key={obj.id} item >

                            <Carta1
                                cardAvatarLetter={obj.user_name[0].toUpperCase()}
                                cardUserName={obj.user_name}
                                cardUserRole={obj.role}
                                cardUserCreated={dateFormat(obj.user_created, "mmm d, yyyy")}
                                cardUserEmail={obj.user_email}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid >
    );
}

const mapStateToProps = state => ({
    usersRowsCount: state.usersRowsCount,
    data: state.dataUsers

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
    setDataUsers(data) {
        dispatch({
            type: "SET_DATA_USERS",
            data
        })
    },
    setDataUserSelected(dataUserSelected) {
        dispatch({
            type: "SET__DATA_USER_SELECTED",
            dataUserSelected
        })
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(UsersCard);

/*
[{ id: 64, user_name: "master", user_email: "altati44@gmail.com", user_password: "$2b$10$oRWurv2aPj2LJ9DTaHJUWO6Jdu0C8cQ1veZlGiqqnpbLwH5ya512C", user_created: "2020-05-08T20:22:38.000Z" },
{ id: 65, user_name: "Luisito", user_email: "suarez@gmail.com", user_password: "$2b$10$Vc5H5/zb9kjZztyJhvPqwOKKajUfWwYSnZFzPrNSs4eoCRU9gAX2a", user_created: "2020-05-08T20:22:38.000Z" },
{ id: 67, user_name: "vbvbvbv", user_email: "vbvb@gmail.com", user_password: "$2b$10$/YpUzy7XroB1o1AWUDNSB.STG0nx6TXjR58xY.XuyzY1DizgCsBp6", user_created: "2020-05-08T20:22:38.000Z" },
{ id: 68, user_name: "eeeeee", user_email: "eeeeee@gmail.com", user_password: "$2b$10$2Oo3mgPcdLpjhvlwwwo8eOgj6DrqrZyo46Wb8ZJ42/dKZ0GE3Sakq", user_created: "2020-05-10T01:48:55.000Z" },
{ id: 69, user_name: "1111", user_email: "1111@gmail.com", user_password: "$2b$10$HC5A/Ac4pSubhwD7K11lGu1eoy254Xwtc.vH8d3NtHrfYmwRBXWBO", user_created: "2020-05-10T02:54:30.000Z" },
{ id: 70, user_name: "lotus", user_email: "lotus@gmail.com", user_password: "$2b$10$pHTTVIAlaWYrvLSb.5hmF.1qVQaPznV45KKT8eJ.zU5chSRSXiUeW", user_created: "2020-05-10T03:02:02.000Z" },
{ id: 71, user_name: "coco", user_email: "coco@gmail.con", user_password: "$2b$10$zXPmI0RCcHRL/zK9M/mINuRWGlnqWDcoPizil4lp68/9vbmlqMK5K", user_created: "2020-05-10T03:31:38.000Z" },
{ id: 106, user_name: "eee", user_email: "eee@gmail.com", user_password: "$2b$10$Z0x7Af8k2Xksc3zKD5SOg.Wk.pkGE18jm7qOzOH2Bi8y4CebLfvXa", user_created: "2020-05-29T17:34:41.000Z" },
{ id: 107, user_name: "sss", user_email: "sss@gmail.com", user_password: "$2b$10$pKhWJRdjcmMZijIBvLvb..hTAmqHPCMVoVeXl/M5MfmzlND.vnJUS", user_created: "2020-05-29T17:46:34.000Z" },
{ id: 108, user_name: "nnnn", user_email: "nnnn@gmail.com", user_password: "$2b$10$6RfokQRWey9CxrWZjh9ntOApP8ILNZDFWGf/HqEoFPMb6t2OhlQ5O", user_created: "2020-05-29T17:48:45.000Z" },
{ id: 109, user_name: "alo", user_email: "alo@gmail.com", user_password: "$2b$10$ZEKtaq5o3EGj73KhKm8creCEsQ1QvbKgp/fDgS3NMrV0n6sL4EIC2", user_created: "2020-06-14T20:49:25.000Z" },
{ id: 111, user_name: "Luis Alberto", user_email: "luisalberto@gmail.com", user_password: "$2b$10$HJuI7ASpeuFfvK87HbXI.u6zwMrSHdslyLaGJel9MfIkd1ct1D6re", user_created: "2020-06-18T02:59:37.000Z" },
{ id: 112, user_name: "Luis Alberto Suarez Pavon", user_email: "1234@gmail.com", user_password: "$2b$10$DmUoWDT9m20lKvH2zBpqduhpvnKv0/KzAEZ8RQ4jU1oserrtS2k7m", user_created: "2020-06-18T03:26:31.000Z" }]
*/