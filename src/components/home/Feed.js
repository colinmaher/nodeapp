import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch'
import config from '../../app.config';

import TweetBox from "./TweetBox";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default withAuth(class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        return (
            <></>
        )
    }
})