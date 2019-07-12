
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { withAuth } from '@okta/okta-react';
import ProfilePage from './ProfilePage';
import Navigation from '../shared/Navigation'
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

export default withAuth(class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.state = {
            authenticated: null
        };
        this.checkAuthentication();
    }

    async checkAuthentication() {
        console.log(this.props.auth.isAuthenticated())
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    onSuccess(res) {
        if (res.status === 'SUCCESS') {
            return this.props.auth.redirect({
                sessionToken: res.session.token
            });
        } else {
            // The user can be in another authentication state that requires further action.
            // For more information about these states, see:
            //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
        }
    }

    onError(err) {
        console.log('error logging in', err);
    }

    render() {
        
        if (this.state.authenticated === null) return null;
        return this.state.authenticated ?
            <Router>
                <Redirect to={{ pathname: '/profile' }} />
                <Route path='/profile' component={ProfilePage} />
            </Router> :
            <div>
                <Navigation />
                <OktaSignInWidget
                    baseUrl={this.props.baseUrl}
                    onSuccess={this.onSuccess}
                    onError={this.onError} />;
            </div>

    }
});