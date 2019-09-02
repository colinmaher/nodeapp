import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import OktaSignInWidget from "./OktaSignInWidget";
// import withAuth from '@okta/okta-react/dist/withAuth';

const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100vh - 5rem)',
    overflowY: 'auto',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    height: '100%',
    overflowY: 'auto',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInSide = (props) => {
  const classes = useStyles();

  async function onSuccess(res) {
    console.log(res)

    if (res.status === 'SUCCESS') {
      try {
        await fetch('/getUserData/' + res.user.id, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
      }
      catch (err) {
        console.log(err)
      }

      return props.auth.redirect({
        sessionToken: res.session.token
      });
    } else {
      // The user can be in another authentication state that requires further action.
      // For more information about these states, see:
      //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  // set error message
  function onError(err) {
    console.log('error logging in', err);
  }

  return (
    < >
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <OktaSignInWidget className={classes.form}
              baseUrl={props.baseUrl}
              onSuccess={onSuccess}
              onError={onError} />
          </div>
        </Grid>
      </Grid>

    </>


  )
};
export default SignInSide;