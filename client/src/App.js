
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { withAuth } from '@okta/okta-react';
import HomePage from './components/home/HomePage';
import SignUp from './components/auth/SignUp';
import config from './app.config';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import GenericProfilePage from './components/home/GenericProfilePage';
import './App.css';
import AuthContext from './contexts/AuthContext'
import ApiContext from './contexts/ApiContext'
import PrimarySearchAppBar from './components/shared/PrimarySearchAppBar';
import api from './api/api'

export default withAuth(class App extends Component {
  render() {
    return (
      <AuthContext.Provider value={this.props.auth}>
        <ApiContext.Provider value={api}>
          <div className="App">
            <PrimarySearchAppBar />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route
                exact path="/login"
                render={() => <LoginPage baseUrl={config.url} />}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route exact path="/signup" component={SignUp} />
              <SecureRoute path="/profile" component={ProfilePage} />
              <Route path="/profile/:username" render={GenericProfilePage} />

            </Switch>
          </div>
        </ApiContext.Provider>


      </AuthContext.Provider>

    );
  }
})