import React from 'react';
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
            feed: [],
            feedSuccess: null,
        }
    }

    componentDidMount() {

    }

    fetchRelevantTweets() {
        fetch('/tweet', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              this.setState({
                feedSuccess: true,
                feed: [res.tweets]
              })
            })
            .catch(err => {
              this.setState({
                feedSuccess: false
              })
            });
    }


    render() {
        return (
            <>
                {this.state.feed.map((tweet) => 
                    <div></div>
                )}
            </>
        )
    }
})