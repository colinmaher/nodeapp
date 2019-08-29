import React from 'react'
import fetch from 'isomorphic-fetch'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class TweetBox extends React.Component {
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
    const tweet = e.target.value;
    if (tweet.length > 280 || tweet.length < 1) {
      this.setState({
        validTweet: false
      })
    }
    else {
      this.setState({
        validTweet: true,
      }, () => {
        this.setState({ tweet: tweet })
      })
    }
  }

  async handleTweetSubmit(e) {
    e.preventDefault();
    
    const userInfo = await this.props.auth.getUser();
    const payload = {
      tweet: this.state.tweet,
      userInfo: userInfo
    }
    fetch('/tweet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        this.setState({
          tweetSuccess: true,
          tweet: '',
          validTweet: false,
        })
        console.log(res.status)
        console.log("Posted tweet")

      })
      .catch(err => {
        this.setState({
          tweetSuccess: false
        })
        console.log(err)
        console.log("Error posting tweet")
      });
  }

  render() {
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
              style={{ 'width': '100%'}}
            />
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