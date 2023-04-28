import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    icon: {
        fontSize: 100,
        color: theme.palette.success.main,
    },
    button: {
        marginTop: theme.spacing(3),
    },
}));

function PaymentSuccess() {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <CheckCircleIcon className={classes.icon} />
            <Typography variant="h4" align="center">
                Payment successful!
            </Typography>
            <Link to="/">
                <button
                    className='btn-primary mt-2'
                    onClick={() => {
                        // Handle button click, such as redirecting to homepage
                    }}
                >
                    Back to homepage
                </button>
            </Link>
        </Grid>
    );
}

export default PaymentSuccess;
