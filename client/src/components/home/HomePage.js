// src/Home.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import Feed from './Feed'
import TweetBox from './TweetBox'
import Container from '@material-ui/core/Container'


export default withAuth(class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;

    const button = this.state.authenticated ?
      <button onClick={this.logout}><Link to='/'>Logout</Link><br /></button> :
      <button onClick={this.login}><Link to='/login'>Login</Link><br /></button>;
    return this.state.authenticated ? 
     (
      <Container m={1} maxWidth="sm">
        <TweetBox auth={this.props.auth}/>
        <Feed />
      </Container>      
    ) : ( <Redirect to={{ pathname: '/login' }}/> );
  }
});