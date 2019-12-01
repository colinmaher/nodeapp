import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import ACTIONS from "../../actions/actions"
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'

const useStyles = makeStyles(theme => ({
  tweetBtn: {
    margin: theme.spacing(1)
  },
}))


// const useStylesTweetField = makeStyles(theme => )


const StyledTextField = withStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    width: '100%',
    height: '100%',
    '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
      borderColor: theme.palette.primary.main,
    }
  },
  disabled: {},
  focused: {},
  error: {},
}))(TextField)

export default function TweetBox(props) {
  const classes = useStyles()
  const auth = useContext(AuthContext)
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
    const text = e.target.value
    console.log(text)
    if (text.length > 280 || text.length === 0) {
      setTweetText(text)
      setValidTweet(false)
    }
    else {
      setTweetText(text)
      setValidTweet(true)
    }
  }

  async function handleTweetSubmit(e) {
    e.preventDefault()
    if (editing) {
      try {
        const token = await auth.getAccessToken()
        const tweet = await api.editTweet(userData.oktaId, tweetText, props.id, token)
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
        const token = await auth.getAccessToken()
        const tweet = await api.postTweet(userData.oktaId, tweetText, token)
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

  // function TweetField(props) {
  //   const tweetFieldClasses = useStylesTweetField()
  //   return (
  //     <TextField


  //       InputProps={{ tweetFieldClasses }}
  //       {...props}
  //     />
  //   )

  // }

  const tweetError = tweetSuccess ? <></> : <span>{errorMsg}</span>
  return (
    <Box m={1} >
        <form autoComplete="off" onSubmit={handleTweetSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={10} >
            <StyledTextField id="outlined-dense-multiline"
              type="text"
              margin="dense"
              variant="outlined"
              multiline
              placeholder="What's on your mind?"
              rowsMax="4"
              value={tweetText}
              onChange={handleTweetChange} />
          </Grid>
          <Grid item>
            {
              validTweet ?
                <Fab type="submit" color="primary" aria-label="add" className={classes.tweetBtn} value="Tweet" ><AddIcon /></Fab> :
                <Fab type="submit" color="primary" aria-label="add" className={classes.tweetBtn} disabled value="Tweet" ><AddIcon /></Fab>
            }
          </Grid>
        </Grid>




        {tweetError}

      </form>
    </Box>
  )
}
