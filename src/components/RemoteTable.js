
import MaterialTable from 'material-table';
//import TablePagination from '@material-ui/core/TablePagination';
//import styled from 'styled-components';

import { forwardRef } from 'react';
import { connect } from "react-redux";

//import Grid from '@material-ui/core/Grid';

//import Paper from '@material-ui/core/Paper';
//import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import React, { useEffect } from "react";
import axios from "axios";

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
            })
            .catch(function (error) {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);//[] para renderizar solo una vez

    function rowClickHanddle(evt, rowData) {
        //rowData.tableData.checked;
        console.log(rowData);
    }

    return (
        <MuiThemeProvider theme={theme}>
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
                            deleteText: 'SURE? {count}'
                        }
                    }
                }}/*
                components={{
                    Action: props => <Button onClick={() => props.onClick()}>My Button</Button>
                }}*/
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
                    }
                ]}
                onRowClick={((evt, rowData) =>
                    rowClickHanddle(evt, rowData)
                )}
                options={{
                    search: true,
                    selection: true,
                    toolbar: true,
                    showTitle: false,
                    pageSizeOptions: [5, 10, 20, 30],
                    //paginationType: 'stepped',
                    exportButton: true,
                    printButton: true,
                    searchAutoFocus: true,
                    headerStyle: {
                        color: '#7986cb',
                        backgroundColor: '#ffe0b2',
                        hoverColor: 'white',
                        //padding: '4px 8px 4px 8px'
                    },
                    rowStyle: rowData => ({
                        //backgroundColor: (selectedRow === rowData.tableData.id) ? '#e3f2fd' : '#FFF'
                        backgroundColor: rowData.tableData.checked ? '#e3f2fd' : ''
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
                                delete fields.created_at;//ignoro created_at para que no me de errores...
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
                                axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;
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
    );
}

const mapStateToProps = state => ({
    columns: state.columns,
    token: state.token,
    data: state.friends.data,
    rowsCount: state.rowsCount
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

});




export default connect(mapStateToProps, mapDispatchToProps)(RemoteTable);

