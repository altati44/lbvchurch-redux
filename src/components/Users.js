import React from 'react';

import Grid from '@material-ui/core/Grid';

export default function Users() {
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
                className="contenedor-users-list"
            >
                <Grid item xs={9} >
                    <div style={{ backgroundColor: 'orange' }}></div>

                </Grid>
                <Grid item xs={3} border={1} > {/**Panel derecho con los detalles del amigo */}
                    <div style={{ backgroundColor: 'lightblue' }}></div>

                </Grid>
            </Grid>
        </div>
    )
}
