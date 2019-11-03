import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ACTIONS from "../../actions/actions";
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'

export default function TweetBox(props) {
  const auth = useContext(AuthContext)
  const api = useContext(ApiContext)
  const dispatch = useDispatch()
  const editing = props.editing || false
  const [validTweet, setValidTweet] = useState(false)
  const [tweetText, setTweetText] = useState(props.tweetText || "")
  const [tweetSuccess, setTweetSuccess] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  function handleTweetChange(e) {
    const tweetText = e.target.value;
    if (tweetText.length > 280 || tweetText.length === 0) {
      setTweetText(tweetText)
      setValidTweet(false)
    }
    else {
      setTweetText(tweetText)
      setValidTweet(true)
    }
  }

  async function handleTweetSubmit(e) {
    e.preventDefault();
    if (editing) {
      try {
        const tweet = await api.editTweet(auth, tweetText, props.id)
        console.log(tweet)
        dispatch(ACTIONS.editTweet(tweet))
        setTweetSuccess(true)
        setTweetText('')
        setValidTweet(false)
      }
      catch (e) {
        setTweetSuccess(false)
        setErrorMsg('Tweet failed to post. Please try again.\n')
      }
    }
    else {
      try {
        const tweet = await api.postTweet(auth, tweetText)
        dispatch(ACTIONS.tweet(tweet))
        setTweetSuccess(true)
        setTweetText('')
        setValidTweet(false)
        
      }
      catch (e) {
        setTweetSuccess(false)
        setErrorMsg('Tweet failed to post. Please try again.\n')
      }
    }
  }


  const tweetError = tweetSuccess ? <></> : <span>{errorMsg}</span>
  return (
    <Box m={1} >
      <form autoComplete="off" onSubmit={handleTweetSubmit}>
        <TextField
          id="outlined-dense-multiline"
          type="text"
          margin="dense"
          variant="outlined"
          multiline
          placeholder="What's on your mind?"
          rowsMax="4"
          value={tweetText}
          onChange={handleTweetChange}
          style={{ 'width': '100%' }}
        />
        {tweetError}
        {
          validTweet ?
            <Button type="submit" variant="contained" value="Tweet">Tweet</Button> :
            <Button type="submit" variant="contained" disabled value="Tweet">Tweet</Button>
        }
      </form>
    </Box>
  )
}
