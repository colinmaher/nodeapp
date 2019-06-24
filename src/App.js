import configureStore from "./modules/store";
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from "react-redux";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navigation from './components/shared/Navigation';
import HomePage from './components/home/HomePage';
import RegistrationForm from './components/auth/RegistrationForm';
import config from './app.config';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import './App.css';
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

export default class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <Router>
        <Security issuer={config.issuer} client_id={config.client_id} redirect_uri={config.redirect_uri}>
          <div className="App">
            <Navigation />
            <main>
              <Route path="/" exact component={HomePage} />
              <Route
                path="/login"
                render={() => <LoginPage baseUrl={config.url} />}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route path="/register" component={RegistrationForm} />
              <SecureRoute path="/profile" component={ProfilePage} />
            </main>
          </div>
          </Security>
        </Router>

      </ReduxProvider>
    );
  }
}