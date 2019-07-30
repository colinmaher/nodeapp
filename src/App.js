
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import HomePage from './components/home/HomePage';
import SignUp from './components/auth/SignUp';
import config from './app.config';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
// import Navigation from './components/shared/Navigation'
import './App.css';
import PrimarySearchAppBar from './components/home/PrimarySearchAppBar';


export default class App extends Component {

  render() {
    return (

      <div className="App">
        <PrimarySearchAppBar />
        <Route path="/" exact component={HomePage} />
        <Route
          path="/login"
          render={() => <LoginPage baseUrl={config.url} />}
        />
        <Route path="/implicit/callback" component={ImplicitCallback} />
        <Route path="/signup" component={SignUp} />
        <SecureRoute path="/profile" component={ProfilePage} />
      </div>


    );
  }
}