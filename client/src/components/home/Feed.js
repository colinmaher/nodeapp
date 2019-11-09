import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from "../../actions/actions"
// import fetch from 'isomorphic-fetch'
import Tweet from './Tweet'
import { Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'
import Fab from '@material-ui/core/Fab'


const useStyles = makeStyles((theme)=> ({
  refreshBtn: {
    margin: theme.spacing(1)
  },
}))

function LatestFeed(props) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [feedSuccess, setFeedSuccess] = useState(true)
  const [feed, setFeed] = useState([])
  const userData = useSelector(state => {
    return state.userData
  });

  return (
    <Feed />
  )
}

export default function Feed(props) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [feedSuccess, setFeedSuccess] = useState(true)
  const [feed, setFeed] = useState([])

  // const dispatch = useDispatch()
  const userData = useSelector(state => {
    // console.log(state)
    return state.userData
  });

  async function waitForTweets() {
    setLoading(true)
    if (userData.tweets !== undefined) {
      setFeed(userData.tweets)
      setFeedSuccess(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    waitForTweets()
  }, [userData.tweets, waitForTweets])

  let feedComponent
  if (!loading) {
    if (feedSuccess) {
      feedComponent = feed.map((tweet) => <Tweet tweet={tweet}></Tweet>)
    }
    else {
      feedComponent = <Typography variant="body1">Error fetching tweets</Typography>
    }
  }
  else {
    feedComponent = <Typography variant="h6">Loading</Typography>
  }
  return (
    <>
    <Fab type="submit" color="primary" aria-label="add" size="small" className={classes.refreshBtn} value="Tweet" >
      <RefreshIcon onClick={() => {
        setLoading(true)
        try {
          props.fetchAndUpdate()
        } catch (err) {
          setFeedSuccess(false)
        }
      }}/>
      {/* <Button >Refresh</Button> */}
    </Fab>

      {feedComponent}
    </>
  )
}