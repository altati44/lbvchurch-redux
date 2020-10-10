
import MaterialTable, { MTableToolbar } from 'material-table';

import './datatable.css';

import { forwardRef } from 'react';
import { connect } from "react-redux";

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

function DataTable(props) {

    props = {
        ...props,
        daColor: props.daColor,
        getData: props.getData,
        columns: props.columns,//Columns Names
        data: props.data,//records
        setData: props.setData,//put data load in data
        setDataSelected: props.setDataSelected,//get the main record selected
        setDataIndexSelected: props.setDataIndexSelected,
        setDataDetails: props.setDataDetails,//all details
        setDataDetailSelected: props.setDataDetailSelected,//details from main data selected
        setDataDetailIndexSelected: props.setDataDetailIndexSelected,
        rowsCount: props.rowsCount,
        httpToServer: props.httpToServer,
        rowClickHandlle: props.rowClickHandlle
    }

    //muestra los datos de la tabla friends cuando el componente es renderizado
    useEffect(() => {
        axios
            .get(props.httpToServer)
            .then(res => {
                props.setData(res.data.result);
                props.setDataSelected(res.data.result[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);//[] para renderizar solo una vez

    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
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
                onRowClick={(evt, rowData) => { props.rowClickHandlle(evt, rowData) }}

                options={{
                    //actionsColumnIndex: -1,

                    search: true,
                    selection: true,
                    //toolbar: true,
                    pagination: true,
                    showTitle: false,
                    //pageSizeOptions: [5, 10, 20, 30, props.rowsCount],
                    pageSizeOptions: [5, 10, 20, 30, { label: 'All', value: props.rowsCount }],//me da error por ser un objeto
                    //paginationType: 'stepped',
                    exportButton: true,
                    exportCvs: (columns, data) => {
                        alert('You should develop a code to export ' + data.length + ' rows');
                    },
                    printButton: true,
                    searchAutoFocus: true,
                    filtering: props.filterOptions,
                    //doubleHorizontalScroll: true,
                    scrollStyle: { backgroundColor: 'red' },
                    headerStyle: {
                        color: '#7986cb',
                        backgroundColor: '#ffe0b2',
                        hoverColor: 'white',
                        textAlign: 'left',
                        //padding: '4px 8px 4px 8px',
                        borderColor: 'red',
                        borderTop: '3px',
                        //position: "sticky", top: 0,
                        //maxBodyHeight: "60vh"
                    },

                    rowStyle: rowData => ({
                        backgroundColor: (props.selectedRow === rowData.tableData.id) ? props.daColor : '',
                        padding: '2px 12px 2px 12px',
                        whiteSpace: 'nowrap',//para que no me ponga el texto de la celda en wrap

                        //overflow: 'hidden',
                        //textOverflow: 'ellipsis',
                        //boxSizing: 'borderbox',
                        //boderBottom: '2px'
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
                                // const data = [...props.data];
                                const data = [...props.data];
                                const index = data.indexOf(oldData);
                                data[index] = newData;
                                const fields = Object.assign({}, newData);
                                delete fields.tableData; //tableData de material-table, un campo con informacion
                                delete fields.id; //borro pq no lo necesito y es autoincrementable y clave primaria
                                delete fields.created;//ignoro created_at para que no me de errores...pues es generado automaticamente
                                axios
                                    .put(props.httpToServer + oldData.id, fields)
                                    .then(res => {
                                        //para redux                                    
                                        props.setData(data);
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
                                    .delete(props.httpToServer + oldData.id)
                                    .then((res) => {
                                        if (res.data.success === 1) {
                                            data.splice(data.indexOf(oldData), 1);
                                            props.setData(data);
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
                                console.log('newData', newData);
                                axios.defaults.headers.common['Authorization'] = `Bearer ${props.token} ${props.user.userId}`;
                                axios
                                    .post(props.httpToServer, newData)
                                    .then((res) => {
                                        if (res.data.success !== 0) {
                                            newData = { "id": res.data.id, ...newData }
                                            data.push(newData);
                                            console.log('added', newData)
                                            //props.setFriendsData(data);
                                            props.setData(data);
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
    token: state.token,
    filterOptions: state.filterOptions,
    friendSelected: state.friendSelected,
    friendDetails: state.friendDetails,
    user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);