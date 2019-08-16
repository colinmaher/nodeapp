// src/OktaSignInWidget.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';
import { withRouter } from 'react-router-dom'

export default withRouter(class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      customButtons: [
        {
          title: 'Sign Up',
          className: 'btn-customAuth',
          click: () => { this.props.history.push('/signup') },

        }
      ],
    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }


  render() {
    return <div style={{ position: 'fixed', }} />
  }
});