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


const useStyles = makeStyles((theme) => ({
  refreshBtn: {
    margin: theme.spacing(1)
  },
}))

export function LatestFeed(props) {
  // const classes = useStyles()
  const tweets = useSelector(state => {
    return state.latestTweets
  });
  useEffect(() => {
    props.fetchAndUpdate(0, null)
  }, [])

  return (
    <>
      <Typography variant="h6">Latest Tweets</Typography>
      <Feed tweets={tweets} {...props} />
    </>
  )
}

export function HistoryFeed(props) {
  // const classes = useStyles()
  const tweets = useSelector(state => {
    return state.userData.tweets
  });

  useEffect(() => {
    props.fetchAndUpdate(0, null)
  }, [])

  return (
    <>
      <Typography variant="h6">Your Tweets</Typography>
      <Feed tweets={tweets} {...props} />
    </>
  )
}

export function Feed(props) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [feedSuccess, setFeedSuccess] = useState(true)
  const [feed, setFeed] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        props.fetchAndUpdate(page, null)
        setPage(page + 1)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  async function waitForTweets() {
    setLoading(true)
    if (props.tweets !== undefined) {
      setFeed(props.tweets)
      setFeedSuccess(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    waitForTweets()
  }, [props.tweets, waitForTweets])

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
    feedComponent = <Typography variant="body1">Loading</Typography>
  }
  return (
    <>


      {feedComponent}
      <Fab type="submit" color="primary" aria-label="add" size="small" className={classes.refreshBtn} value="Tweet" >
        <RefreshIcon onClick={() => {
          setLoading(true)
          try {
            props.fetchAndUpdate()
          } catch (err) {
            setFeedSuccess(false)
          }
        }} />
      </Fab>
    </>
  )
}