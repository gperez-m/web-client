import React, {useContext, useState} from 'react'
import {MyContext} from '../routes/MyContext'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Table() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        button: {
            margin: theme.spacing(1),
        },
    }));


    const { useState } = React;
    const {getEmployees, addEmployee, deleteEmployee, rootState, logoutUser, updateEmployee} = useContext(MyContext);
    const {theUser} = rootState;
  
    const [columns, setColumns] = useState([
        { title: 'Nombre del empleado', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Puesto', field: 'position' },
        { title: 'Fecha de Nacimiento', field: 'birthday', type: 'date' },
        { title: 'Domicilio', field: 'address' },
        { title: 'Habilidades', field: 'skills' }
    ]);
  
    const tableRef = React.createRef();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Paper className={classes.paper} elevation={1} >
                        User: {theUser.email}
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={logoutUser}
                        className={classes.button}
                        startIcon={<ExitToAppIcon />}
                    >
                        Log out
                    </Button>
                </Grid>
                <Grid item xs={12}>
                <MaterialTable
                    title="Lista de empleados"
                    tableRef={tableRef}
                    columns={columns}
                    data={query =>
                        new Promise(async (resolve, reject) => {
                            const result = await getEmployees(query)
                            resolve({
                                data: result.data,
                                page: result.current_page-1,
                                totalCount: result.total,
                            })
                        })
                    }
                    editable={{
                    onRowAdd: newData =>
                        new Promise(async (resolve, reject) => {
                            const result = await addEmployee(newData)
                            resolve()
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(async (resolve, reject) => {
                            const result = await updateEmployee(newData, oldData)
                            resolve()
                        }),
                    onRowDelete: oldData =>
                        new Promise(async (resolve, reject) => {
                            const result = await deleteEmployee(oldData)
                            resolve()
                        }),
                    }}
                    actions={[
                        {
                        icon: 'refresh',
                        tooltip: 'Actualizar',
                        isFreeAction: true,
                        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                        }
                    ]}
                />
                </Grid>
            </Grid>
        </div>
    )
}

export default Table;

