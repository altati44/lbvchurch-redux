
import MaterialTable, { MTableToolbar } from 'material-table';
import CardDetails from './CardDetails'
//import TablePagination from '@material-ui/core/TablePagination';
//import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { ArrowForwardIosIcon, Ballot } from '@material-ui/icons';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Tooltip from '@material-ui/core/Tooltip';

import { forwardRef } from 'react';
import { connect } from "react-redux";

//import Grid from '@material-ui/core/Grid';

//import Paper from '@material-ui/core/Paper';
//import Box from '@material-ui/core/Box';
//import Button from '@material-ui/core/Button';

import React, { useEffect } from "react";
import axios from "axios";
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import FaceIcon from '@material-ui/icons/Face';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

//import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
//import { Divider } from '@material-ui/core';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#304ffe',//'#4caf50',
        },
        secondary: {
            main: '#448aff',//'#ff9100',
            light: '#448aff',
            dark: '#37b159',
        },


        //fontSize: "18",


    }

});

function RemoteTable(props) {
    //muestra los datos de la tabla friends cuando el componente es renderizado
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/friends")
            .then(res => {
                props.setFriendsData(res.data.result);
                props.setFriendSelected(res.data.result[0]);
                console.log(res.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);//[] para renderizar solo una vez


    /**cargando los detalles del amigo seleccionado... */
    async function loadFriendsSelected(id) {
        try {
            axios.defaults.headers.common['Authorization'] = '';
            const res = await axios.get('http://localhost:5000/api/friends/' + id);
            if (res.data.success === 1) {
                //console.log(res.data.result[0].user_name)
                //props.messageOpen(res.data.user.userName + ' ' + res.data.message, 'success')
                //props.updateToken(res.data.token);
                let rows = res.data.rows;
                let arrayModules = [];
                console.log('res', res.data.rows)
                props.setFriendDetails(res.data.rows)
                /*rows.forEach(element => {
                    //console.log(element.module_id)
                    arrayModules.push([element.module_id, element.module_display_name, element.module_icon, element.module_name, element.module_access])
                })
                arrayModules.sort((a, b) => a[0] - b[0]);


                //rows.sort();
                //props.setUserRows(rows);
                //props.setUserModules(arrayModules);
                //props.loggedIn(res.data.user.userName);

                //props.loginFormClose();

                console.log('rows modules', arrayModules)*/
            } else {
                props.messageOpen(res.data.data, 'error')
                console.log(res.data.data)
            }
        } catch{ props.messageOpen('Connection refused.', 'error') }
    }

    async function rowClickHanddle(evt, rowData) {
        await setSelectedRow(rowData.tableData.id);
        await props.setFriendSelected(rowData);
        console.log('rowSelected', rowData)
        loadFriendsSelected(rowData.friend_id)
        //console.log(props.friendSelected.firstname + ' ' + props.friendSelected.middlename + ' ' + props.friendSelected.lastname);
    }


    const [selectedRow, setSelectedRow] = React.useState(0);

    function visitsClick(evt) {
        console.log('ADICIONAR UNA VISITA DEL FRIEND....')
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={props.showDetails ? 8 : 12} >
                <MuiThemeProvider theme={theme}>
                    {/*<div style={{ padding: '0px 10px', color: '#FFFF', backgroundColor: '#4939d4' }}>
                {props.friendSelected.firstname + ' ' + props.friendSelected.middlename + ' ' + props.friendSelected.lastname}
            </div>*/}
                    <MaterialTable
                        //title={[props.rowsCount, ' total(s) rows.']}
                        icons={tableIcons}
                        columns={props.columns}
                        data={props.data}
                        // other props
                        localization={{
                            pagination: {
                                labelDisplayedRows: '{from}-{to} of {count}'
                            },
                            toolbar: {
                                nRowsSelected: '{0} row(s) selected'
                            },
                            header: {
                                actions: 'ACTIONS',
                            },
                            body: {
                                emptyDataSourceMessage: 'No records to display',
                                filterRow: {
                                    filterTooltip: 'Filter'
                                },
                                editRow: {
                                    deleteText: 'Are you sure delete this row?'
                                }
                            }
                        }}
                        components={{
                            //Action: props => <Button onClick={() => props.onClick()}>My Button</Button>...  4939d4
                            Toolbar: propers => (
                                <div>
                                    <React.Fragment>


                                        <Grid container wrap="nowrap" direction="row" justify="flex-end" alignItems="center" spacing={0}
                                            style={{
                                                height: '50px', padding: '0px 10px', backgroundColor: '#2196f3',
                                                alignItems: 'center'
                                            }}>
                                            <Grid item xs={11} style={{ align: 'left', color: '#FFFF' }} >

                                                <Typography noWrap align='left' style={{ color: 'rgb(238, 229, 214)' }}>
                                                    {props.friendSelected.firstname + ' ' + props.friendSelected.middlename + ' ' + props.friendSelected.lastname}
                                                </Typography>
                                            </Grid>


                                            <Grid item xs={false} >
                                                <Tooltip title="Visits">
                                                    <Badge badgeContent={props.friendDetails.length == 0 ? 0 : props.friendDetails.length} color="error"
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right',
                                                        }}
                                                        onClick={(evt) => visitsClick(evt)}
                                                    >
                                                        <AccountBalanceIcon style={{ color: '#fafafa' }} />
                                                    </Badge>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item xs={false} style={{ align: 'right' }}>

                                                <Tooltip title="Show Details">
                                                    <IconButton onClick={props.setShowDetails}>
                                                        <Ballot
                                                            style={{ color: '#fafafa' }}

                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                        <MTableToolbar {...propers} />
                                    </React.Fragment>
                                </div>
                            ),
                        }}
                        actions={[
                            {
                                tooltip: 'Remove All Selected Rows',
                                icon: tableIcons.Delete,
                                onClick: (evt, data) => console.log(data)
                            },
                            {
                                tooltip: 'Export All Selected Rows',
                                icon: tableIcons.Export,
                                onClick: (evt, data) => console.log(data)
                            },
                            {
                                tooltip: 'Show Filter Options',
                                isFreeAction: true,
                                icon: tableIcons.Filter,
                                onClick: (evt, data) => props.setFilterOptions(true)
                            }
                        ]}
                        onRowClick={((evt, rowData) => rowClickHanddle(evt, rowData))}

                        options={{
                            search: true,
                            selection: true,
                            //toolbar: true,
                            showTitle: false,
                            pageSizeOptions: [5, 10, 20, 30],
                            //paginationType: 'stepped',
                            exportButton: true,
                            printButton: true,
                            searchAutoFocus: true,
                            filtering: props.filterOptions,
                            headerStyle: {
                                color: '#7986cb',
                                backgroundColor: '#ffe0b2',
                                hoverColor: 'white',
                                //padding: '4px 8px 4px 8px'
                            },
                            rowStyle: rowData => ({
                                backgroundColor: (selectedRow === rowData.tableData.id) ? '#e3f2fd' : ''
                                //backgroundColor: rowData.tableData.checked ? '#e3f2fd' : '#FFF'
                            })
                        }}
                        editable={{
                            /**La parte que dice para redux es para guaradr y actualizar la informacion de la 
                             * tabla en data de la store, lo tengo comentado porque para que me funcione tengo
                             * que llamar despues de updateFriendsData a setFriendsData para que los cambios 
                             * se reflejen en la tabla y eso renderiza dos veces la tabla, ... tengo que arreglarlo
                             */
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...props.data];
                                        const index = data.indexOf(oldData);
                                        data[index] = newData;
                                        const fields = Object.assign({}, newData);
                                        delete fields.tableData; //tableData de material-table, un campo con informacion
                                        delete fields.friend_id; //borro pq no lo necesito y es autoincrementable y clave primaria
                                        delete fields.created;//ignoro created_at para que no me de errores...pues es generado automaticamente
                                        axios
                                            .put("http://localhost:5000/api/friends/" + oldData.friend_id, fields)
                                            .then(res => {
                                                //para redux                                    
                                                props.setFriendsData(data);
                                                props.messageOpen(res.data.message, 'success');
                                            });
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...props.data];
                                        //data.splice(data.indexOf(oldData), 1);
                                        axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDgsIm5hbWUiOiJubm5uIiwiZW1haWwiOiJubm5uQGdtYWlsLmNvbSJ9LCJpYXQiOjE1OTEyMzExMDksImV4cCI6MTU5MTMxNzUwOX0.y-Rwt5eyuHCJ-rdHRxJZvXBEdB3C4rw6ZJmEIjFB5sI';
                                        axios
                                            .delete("http://localhost:5000/api/friends/" + oldData.friend_id)
                                            .then((res) => {
                                                if (res.data.success === 1) {
                                                    //console.log(res.data.success)
                                                    data.splice(data.indexOf(oldData), 1);
                                                    props.setFriendsData(data);
                                                    props.messageOpen(res.data.message, 'success');
                                                }
                                            });
                                    }, 600);
                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...props.data];
                                        newData = { "user_id": props.user.userId, ...newData }//guardando el usuario que adiciona...
                                        axios.defaults.headers.common['Authorization'] = `Bearer ${props.token} ${props.user.userId}`;
                                        axios
                                            .post('http://localhost:5000/api/friends/', newData)
                                            .then((res) => {
                                                if (res.data.success !== 0) {
                                                    newData = { "friend_id": res.data.id, ...newData }
                                                    data.push(newData);
                                                    console.log('added', newData)
                                                    props.setFriendsData(data);
                                                    props.messageOpen(res.data.message, 'success');
                                                } else props.messageOpen(res.data.message, 'error');
                                            });
                                    }, 600);
                                }),
                        }}
                    />
                </MuiThemeProvider>
            </Grid>
            <Grid item xs={4}>
                {props.showDetails && <CardDetails />}
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
    user: state.user,
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
});




export default connect(mapStateToProps, mapDispatchToProps)(RemoteTable);

