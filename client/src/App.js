
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { SecureRoute, ImplicitCallback } from '@okta/okta-react'
import { withAuth } from '@okta/okta-react'
import HomePage from './components/home/HomePage'
import SignUp from './components/auth/SignUp'
import config from './app.config'
import LoginPage from './components/auth/LoginPage'
import ProfilePage from './components/auth/ProfilePage'
import SettingsPage from './components/auth/SettingsPage'
import GenericProfilePage from './components/home/GenericProfilePage'
import './App.css'
import AuthContext from './contexts/AuthContext'
import ApiContext from './contexts/ApiContext'
import PrimarySearchAppBar from './components/shared/PrimarySearchAppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import api from './api/api'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'


const theme = createMuiTheme({

})

export default withAuth(class App extends Component {
  render() {
    return (
      <AuthContext.Provider value={this.props.auth}>
        <ApiContext.Provider value={api}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
                <SecureRoute exact path="/profile" component={ProfilePage} />
                <SecureRoute path="/settings" component={SettingsPage} />
                <Route path="/profile/:id" component={GenericProfilePage} />

              </Switch>
            </div>
          </ThemeProvider>

        </ApiContext.Provider>


      </AuthContext.Provider>

    )
  }
})