import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import ACTIONS from "../../actions/actions"
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'

const useStyles = makeStyles(theme => ({
  tweetBtn: {
    margin: theme.spacing(1)
  },
  textField: {
    margin: theme.spacing(2)
  },
}))

export default function TweetBox(props) {
  const classes = useStyles()
  // const auth = useContext(AuthContext)
  const api = useContext(ApiContext)
  const dispatch = useDispatch()
  const editing = props.editing || false
  const [validTweet, setValidTweet] = useState(false)
  const [tweetText, setTweetText] = useState(props.tweetText || "")
  const [tweetSuccess, setTweetSuccess] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const userData = useSelector(state => {
    return state.userData
  })

  function handleTweetChange(e) {
    const tweetText = e.target.value
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
    e.preventDefault()
    if (editing) {
      try {
        const tweet = await api.editTweet(userData.oktaId, tweetText, props.id)
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
        const tweet = await api.postTweet(userData.oktaId, tweetText)
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
        <div className="">
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
            className={classes.textField}
          />
          {
            validTweet ?
              <Fab type="submit" color="primary" aria-label="add" className={classes.tweetBtn} value="Tweet" ><AddIcon /></Fab> :
              <Fab type="submit" color="primary" aria-label="add" className={classes.tweetBtn} disabled value="Tweet" ><AddIcon /></Fab>
          }
        </div>

        {tweetError}

      </form>
    </Box>
  )
}
