import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from "../../actions/actions"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SettingsPage(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const auth = useContext(AuthContext)
  const api = useContext(ApiContext)
  const userData = useSelector(state => {
    return state.userData
  })

  const [firstName, setFirstName] = useState(userData.data.firstName)
  const [lastName, setLastName] = useState(userData.data.lastName)
  const [email, setEmail] = useState(userData.data.email)
  const [password, setPassword] = useState("")

  //TODO
  async function handleSubmit(e) {
    e.preventDefault()
    const token = await auth.getAccessToken()
    const id = await userData.data.oktaId
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    }
    // const newUserData = await api.setUserData(id, token, payload)

    // dispatch(ACTIONS.userDataPostRequest(id, token, payload))
  }

  function handleFirstNameChange(e) {
    setFirstName(e.target.value)
  }
  function handleLastNameChange(e) {
    setLastName(e.target.value)
  }
  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange() {

  }

  if (userData === null) return null
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Settings
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                type="text"
                autoFocus
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                type="text"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Contact Email"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            id="submit" value="Register"
          >
            Save
          </Button>
        </form>

      </div>
    </Container>

  )
}