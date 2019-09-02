// src/OktaSignInWidget.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';


export default class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      customButtons: [
        {
          title: 'Sign Up',
          className: 'btn-customAuth',
          click: async () => {
            this.props.history.push('/signup');
            await fetch('/users/getMyData', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ this.props.auth. })
            })
          },

        }
      ],
    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }


  render() {
    return <div style={{ overflow: 'auto', }} />
  }
};