
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { withAuth } from '@okta/okta-react';
import HomePage from './components/home/HomePage';
import SignUp from './components/auth/SignUp';
import config from './app.config';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import './App.css';
import PrimarySearchAppBar from './components/home/PrimarySearchAppBar';


export default withAuth(class App extends Component {

  render() {
    return (
      <div className="App">
        <PrimarySearchAppBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route 
            path="/login"
            render={() => <LoginPage auth={this.props.auth} baseUrl={config.url} />}
          />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/signup" render={() => <SignUp auth={this.props.auth}></SignUp>} />
          <SecureRoute path="/profile" component={ProfilePage} />
        </Switch>
      </div>
    );
  }
})