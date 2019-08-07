import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import fetch from 'isomorphic-fetch'
import config from '../../app.config';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default withAuth(class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweet: '',
            validTweet: false,
        }
        this.handleTweetChange = this.handleTweetChange.bind(this)
        this.handleTweetSubmit = this.handleTweetSubmit.bind(this)
    }

    handleTweetChange(e) {
        if (e.target.value.length > 240 && !this.state.validState) {
            this.setState({
                validTweet: false,
            })
        }
        else {
            this.setState({
                tweet: e.target.value,
                validTweet: true,
            })
        }

    }

    handleTweetSubmit(e) {
        e.preventDefault();
        const payload = {
            tweet: this.state.tweet,
        }
        fetch(config.serverUrl + '/tweet', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(user => {
                this.oktaAuth
                    .signIn({
                        username: this.state.email,
                        password: this.state.password
                    })
                    .then(res =>
                        this.setState({
                            sessionToken: res.sessionToken
                        })
                    );
            })
            .catch(err => console.log);
    }

    render() {
        return (
            <form autoComplete="off" onSubmit={this.handleTweetSubmit}>
                <TextField
                    id="outlined-dense-multiline"
                    margin="dense"
                    variant="outlined"
                    multiline
                    placeholder="What's on your mind?"
                    rowsMax="4"
                    onChange={this.handleTweetChange}
                />
                { 
                    this.state.validTweet ? 
                    <Button type="submit" primary value="Tweet">Tweet</Button> : 
                    <Button type="submit" primary disabled value="Tweet">Tweet</Button>
                }
                
            </form>
        )
    }
})