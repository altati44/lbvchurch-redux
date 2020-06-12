import React from 'react';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TableTest from './TableTest'



export default function DentroDelDivApp() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} /> {/**para separar el contenido de la barra de menu */}
                <Grid item xs={8}>
                    {/*dentro va la tabla*/}
                    <Paper style={{ backgroundColor: 'black', boxShadow: 'none' }}>
                        <Box my={2} style={{ padding: 'none', boxShadow: 'none' }} ></Box>
                        <Box my={2} style={{ padding: 'none', boxShadow: 'none' }} >

                            <TableTest />


                        </Box>
                    </Paper>

                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Box my={2} color="success.main">
                            {/*<ShoppingCart />*/}

                        </Box>
                    </Paper>

                </Grid>
            </Grid>
        </div>
    )
}
