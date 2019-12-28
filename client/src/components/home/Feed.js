import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from "../../actions/actions"
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'
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
  const dispatch = useDispatch()
  const api = useContext(ApiContext)
  // const auth = useContext(AuthContext)
  const latestTweets = useSelector(state => {
    return state.latestTweets.tweets
  });

  const page = useSelector(state => {
    return state.latestTweets.page
  })

  async function fetchAndUpdateLatest() {
    const data = await api.getLatestTweets(page, null)
    console.log(latestTweets)
    console.log(data)
    if (page !== undefined && data !== undefined) {
      dispatch(ACTIONS.addLatestTweets(data))
      dispatch(ACTIONS.pageLatestTweets(page + 1))
    }
  }
  useEffect(() => {
    fetchAndUpdateLatest()
  }, [])

  return (
    <div>
      <Typography variant="h6">Latest Tweets</Typography>
      <Feed tweets={latestTweets} {...props} fetchAndUpdate={fetchAndUpdateLatest} />
    </div>
  )
}

export function HistoryFeed(props) {
  // const classes = useStyles()
  const api = useContext(ApiContext)
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const [tweets, setTweets] = useState([])

  async function fetchAndUpdateHistory() {
    let id
    if (props.id) {
      id = props.id
    }
    else {
      const user = await auth.getUser()
      id = user.sub
    }
    let data = await api.fetchTweets(id)
    console.log(data)
    data = data.reverse()

    if (data !== undefined) {
      setTweets(data)
    }

  }

  useEffect(() => {
    fetchAndUpdateHistory()
  }, [])



  return (
    <div>
      {props.id ? <></> : <Typography variant="h6">Your Tweets</Typography>}
      <Feed tweets={tweets} {...props} fetchAndUpdate={fetchAndUpdateHistory} />
    </div>
  )
}

export function Feed(props) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [feedSuccess, setFeedSuccess] = useState(true)
  const [feed, setFeed] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        props.fetchAndUpdate()
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
  if (!loading && feed !== null) {
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