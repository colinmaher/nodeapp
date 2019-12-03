import React from 'react';
import { MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
// import { withAuth } from '@okta/okta-react';

export default class MenuOptions extends React.Component {
  static contextType = AuthContext
  constructor(props) {
    super(props)
    this.state = {
      authenticated: null,
    };
    this.checkAuthentication = this.checkAuthentication.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

  }

  async checkAuthentication() {
    const authenticated = await this.context.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated })
    }
  }

  async componentDidMount() {
    this.checkAuthentication()
  }

  async componentDidUpdate() {
    this.checkAuthentication()
  }

  async login() {
    this.context.login('/')
  }

  async logout() {
    this.context.logout('/')
  }

  render() {
    const menuOptions = this.state.authenticated ? (
      <>
        <Link to="/profile"><MenuItem >Profile</MenuItem></Link>
        <Link to="/settings"><MenuItem >Settings</MenuItem></Link>
        <Link to="/"><MenuItem onClick={() => {
          this.context.logout()
        }}>Logout</MenuItem></Link>
      </>
    ) : (
        <>
          <Link to="/login"><MenuItem>Login</MenuItem></Link>
          <Link to="/signup"><MenuItem>Create Account</MenuItem></Link>
        </>
      )
    return (
      menuOptions
    )
  }
}