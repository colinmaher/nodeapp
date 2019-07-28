import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class MenuOptions extends React.Component {
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
        const menuOptions = this.state.authenticated ? (
            <div>
                <MenuItem onClick={handleMenuClose}><Link to="/profile">Profile</Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><Link to="/logout">Logout</Link></MenuItem>
            </div>

        ) : (<MenuItem onClick={handleMenuClose}><Link to="/login">Login</Link></MenuItem>);
        return (
              {menuOptions}
          )
    }
});