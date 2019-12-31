import React, { useContext } from 'react';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import OktaAuth from '@okta/okta-auth-js';
import config from '../../app.config';
// import { withAuth } from '@okta/okta-react';

import { Link } from "react-router-dom";

import AuthContext from '../../contexts/AuthContext'
import ACTIONS from '../../actions/actions'

class RegistrationForm extends React.Component {
  static contextType = AuthContext
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: null,
      sessionToken: null,
      signUpError: this.props.signInError,
      userInputErrors: []
    };
    this.oktaAuth = new OktaAuth({ url: config.url });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  async checkAuthentication() {
    const token = await this.context.getIdToken();
    if (token) {
      this.setState({ token });
    }
  }
  componentDidUpdate() {
    this.checkAuthentication();
  }

  validateUserInput() {
    let nameRegex = /[a-zA-Z]+[^#&<>\"~;$^%{}?+=\\[\]!@,./_`:*()|\d]{1,20}$/
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
    let errorArray = []
    return new Promise((resolve) => {
      if (!nameRegex.test(this.state.firstName)) {
        errorArray.push("Invalid first name.")
      }
      if (!nameRegex.test(this.state.lastName)) {
        errorArray.push("Invalid last name.")
      }
      if (!emailRegex.test(this.state.email)) {
        errorArray.push("Invalid email.")
      }
      if (!passwordRegex.test(this.state.password)) {
        errorArray.push("Invalid password.")
      }
      this.setState({
        userInputErrors: this.state.userInputErrors.concat(errorArray)
      }, resolve)
    })

  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  clearErrors() {
    return new Promise((resolve) => {
      this.setState({ userInputErrors: [] }, resolve)
    })
  }

  createOktaUser() {
    return new Promise((resolve) => {
      this.oktaAuth
        .signIn({
          username: this.state.email,
          password: this.state.password
        })
        .then(res => {
          console.log(res)
          this.setState({
            sessionToken: res.sessionToken
          }, resolve)
        })
        .catch(e => {
          console.log(e)
          this.props.createUserFail(e.message)
        });
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.clearErrors()
    await this.validateUserInput()
    if (this.state.userInputErrors.length > 0) return
    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    }
    try {
      await this.props.createUserRequest(payload)
      await this.createOktaUser()
    }
    catch (e) {
      this.props.createUserFail(e)
    }
  }

  render() {
    if (this.state.sessionToken) {
      // console.log(this.context)
      this.context.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const classes = this.props.classes;

    return (
      <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              fullWidth
              id="firstName"
              label="First Name"
              type="text"
              autoFocus
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              autoComplete="lname"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            {this.state.signInError !== null ? <Typography variant="caption" color="error">{this.state.signInError}</Typography> : null}
            {this.state.userInputErrors.map((error, i) =>
              <Typography key={i} variant="caption" color="error">{error}<br /></Typography>
            )}
            <Typography variant="body2">Passwords must:</Typography>
            <Typography variant="caption"> - be at least 8 characters<br /></Typography>
            <Typography variant="caption"> - contain a number<br /></Typography>
            <Typography variant="caption"> - contain a lowercase letter<br /></Typography>
            <Typography variant="caption"> - contain an uppercase letter<br /></Typography>
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
          Sign Up
          </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Sign in
              </Link>
          </Grid>
        </Grid>
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  const signInError = state.signInError
  return { signInError }
}

const mapDispatchToProps = { createUserRequest: ACTIONS.createUserRequest, createUserFail: ACTIONS.createUserFail }

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

