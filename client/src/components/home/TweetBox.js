import React from 'react'
import { connect } from "react-redux";
import fetch from 'isomorphic-fetch'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ACTIONS from "../../actions/actions";

class TweetBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tweet: '',
      validTweet: false,
      tweetSuccess: null,
      validatedTweet: null,
    }
    this.handleTweetChange = this.handleTweetChange.bind(this)
    this.handleTweetSubmit = this.handleTweetSubmit.bind(this)
  }

  handleTweetChange(e) {
    const tweet = e.target.value;
    if (tweet.length > 280 || tweet.length === 0) {
      this.setState({
        validTweet: false,
        tweet: tweet
      })
    }
    else {
      this.setState({
        validTweet: true,
        tweet: tweet
      })
    }
  }

  async handleTweetSubmit(e) {
    e.preventDefault();
    const oktaUser = await this.props.auth.getUser();
    const payload = {
      tweet: this.state.tweet,
    }

    fetch('/user/' + oktaUser.sub + '/tweet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      console.log(res)
      return res.json()
    }).then(res => {
      console.log(res)
      this.props.tweet(ACTIONS.tweet(res))
    }).then(() => {
      this.setState({
        tweetSuccess: true,
        tweet: '',
        validTweet: false,
      })
    }).catch(err => {
      
      this.setState({
        tweetSuccess: false,
        errorMsg: 'Tweet failed to post. Please try again.\n'
      })
      // change later
      throw Error(err)
    })

  }


  render() {
    const tweetError = this.state.tweetSuccess ? <></> : <span>{this.state.errorMsg}</span>
    return (
      <Box m={1} >
        <form autoComplete="off" onSubmit={this.handleTweetSubmit}>
          <TextField
            id="outlined-dense-multiline"
            type="text"
            ref="TweetBox"
            margin="dense"
            variant="outlined"
            multiline
            placeholder="What's on your mind?"
            rowsMax="4"
            value={this.state.tweet}
            onChange={this.handleTweetChange}
            style={{ 'width': '100%' }}
          />
          {tweetError}
          {
            this.state.validTweet ?
              <Button type="submit" variant="contained" value="Tweet">Tweet</Button> :
              <Button type="submit" variant="contained" disabled value="Tweet">Tweet</Button>
          }
        </form>
      </Box>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    tweet: (action) => dispatch(action),
  }
}
export default connect(
  null,
  mapDispatchToProps
)(TweetBox)