// src/Home.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Feed from './Feed'
import TweetBox from './TweetBox'
import Container from '@material-ui/core/Container'


export default class HomePage extends Component {
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

  render() {
    if (this.state.authenticated === null) return null;

    return this.state.authenticated ? 
     (
      <Container m={1} maxWidth="sm">
        <TweetBox auth={this.props.auth}/>
        <Feed auth={this.props.auth}/>
      </Container>      
    ) : ( <Redirect to={{ pathname: '/login' }}/> );
  }
};
