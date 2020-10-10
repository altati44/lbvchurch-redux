import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';


export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://mywebsite.com/">
                My Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}