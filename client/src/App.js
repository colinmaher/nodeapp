
import React, { Component, createContext } from 'react';
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
import PrimarySearchAppBar from './components/shared/PrimarySearchAppBar';

export default withAuth(class App extends Component {
  render() {
    return (
      <AuthContext.Provider value={this.props.auth}>
        <div className="App">
        <PrimarySearchAppBar />
        <Switch>
          <Route path="/" exact render={() => <HomePage auth={this.props.auth}></HomePage>} />
          <Route
            exact path="/login"
            render={() => <LoginPage auth={this.props.auth} baseUrl={config.url} />}
          />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route exact path="/signup" render={() => <SignUp auth={this.props.auth}></SignUp>} />
          <SecureRoute path="/profile" component={ProfilePage} />
          <Route path="/profile/:username" render={GenericProfilePage} />

        </Switch>
        </div>

      </AuthContext.Provider>

    );
  }
})