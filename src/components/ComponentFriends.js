import CardDetails from './CardDetails';
import { IconButton } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Tooltip from '@material-ui/core/Tooltip';
import { Ballot } from '@material-ui/icons';
import { connect } from "react-redux";

import React from "react";
import axios from "axios";
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import DataTable from './DataTable';

function ComponentFriends(props) {
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
                //let arrayModules = [];
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
        } catch{ props.messageOpen('Connection refused.', 'error') }
    }

    //Cuando ocurre un onClick sobre un campo de la tabla
    function rowClickHandlle(evt, rowData) {
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

    return (
        <Grid
            container spacing={2} className="contenedor-remote-table"
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
        >
            <Grid item xs={props.showDetails ? 9 : 12} style={{ align: 'center' }} >
                <React.Fragment>{/**Este fragment es para la barra de titulo de la tabla, debo hacerlo todo en un nuevo componente y dejar la tabla sola en uno */}
                    <Grid container wrap="nowrap" direction="row" justify="flex-end" alignItems="center" spacing={0}
                        style={{
                            height: '50px', padding: '0px 10px', backgroundColor: '#2196f3',
                            alignItems: 'center'
                        }}>
                        <Grid item xs={11} style={{ align: 'left', color: '#FFFF' }} >

                            <Typography noWrap align='left' style={{ color: 'rgb(238, 229, 214)' }}>{/** + ' ' + props.friendSelected.middlename + ' ' + props.friendSelected.lastname} */}
                                {props.friendSelected.firstname !== (null && '') ? props.friendSelected.firstname + ' ' : ''}
                                {props.friendSelected.middlename !== (null && '') ? props.friendSelected.middlename + ' ' : ''}
                                {props.friendSelected.lastname !== (null && '') ? props.friendSelected.lastname : ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={false} >
                            <Tooltip title="Visits">
                                <Badge badgeContent={props.friendDetails.length === 0 ? 0 : props.friendDetails.length} color="error"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                //onClick={(evt) => visitsClick(evt)} //visitsClick(evt)//toogle
                                >
                                    <AccountBalanceIcon style={{ color: '#fafafa' }} />
                                </Badge>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={false} style={{ align: 'right' }}>

                            <Tooltip title={props.showDetails ? "Hide Details" : "Show Details"}>
                                <IconButton onClick={props.setShowDetails}>
                                    <Ballot
                                        style={{ color: '#fafafa' }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </React.Fragment>

                {/**DataTable con todos los props necesarios */}
                <DataTable
                    daColor='#e3f2fd'
                    data={props.data}
                    setData={props.setFriendsData}
                    columns={props.columns}
                    rowsCount={props.rowsCount}
                    setDataDetails={props.setFriendDetails}
                    setDataIndexSelected={props.setSelectedRow}
                    setDataSelected={props.setFriendSelected}
                    setDataDetailIndexSelected={props.setFriendDateSelected}
                    rowClickHandlle={rowClickHandlle}
                    httpToServer="http://localhost:5000/api/friends/"//posible no necesario pq no se necesite una primera carga
                />
            </Grid>
            <Grid item xs={3} id="card-details" border={1} style={{ align: 'center' }}> {/**Panel derecho con los detalles del amigo ......pasarlo aparte y dejar table sola en este*/}
                <div style={{ minWidth: "310px", maxWidth: "310px", position: 'fixed' }}>
                    {props.showDetails && <CardDetails />}
                    {/**{showPanel && <PanelView />}BORRAR ESTO QUE ES SOLO DE PRUEBA............................................................... */}
                </div>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    columns: state.columns,
    token: state.token,
    data: state.friends.data,
    rowsCount: state.rowsCount,
    filterOptions: state.filterOptions,
    friendSelected: state.friendSelected,
    friendDetails: state.friendDetails,
    selectedRow: state.selectedRow,
    showDetails: state.showDetails
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

export default connect(mapStateToProps, mapDispatchToProps)(ComponentFriends);