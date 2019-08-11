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
      tweetSuccess: null,
    }
    this.handleTweetChange = this.handleTweetChange.bind(this)
    this.handleTweetSubmit = this.handleTweetSubmit.bind(this)
  }

  handleTweetChange(e) {
    if (!this.state.validTweet && e.target.value.length < 240) {
      this.setState({
        validTweet: true
      })
    }
  }

  handleTweetSubmit(e) {
    e.preventDefault();
    if (e.target.value.length > 240) {
      this.setState({
        validTweet: false,
      })
    }
    else {
      this.setState({
        tweet: e.target.value,
        validTweet: true,
      })
      const payload = {
        tweet: this.state.tweet,
      }
      fetch(config.serverUrl + '/tweet', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(res => {
          this.setState({
            tweetSuccess: true
          })
        })
        .catch(err => {
          this.setState({
            tweetSuccess: false
          })
        });
    }
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
            <Button type="submit" variant="contained" color="primary" value="Tweet">Tweet</Button> :
            <Button type="submit" variant="contained" color="primary" disabled value="Tweet">Tweet</Button>
        }

      </form>
    )
  }
})