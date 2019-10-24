import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "../../actions/actions";
// import fetch from 'isomorphic-fetch'
import Tweet from '../shared/Tweet'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'


export default function Feed(props) {
  // const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [feedSuccess, setFeedSuccess] = useState(true);
  const [feed, setFeed] = useState([]);

  // const dispatch = useDispatch()
  const userData = useSelector(state => {
    console.log(state)
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

  // const dispatch = useDispatch()
  useEffect(() => {
    waitForTweets()
  }, [userData.tweets])

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
      <Button onClick={() => {
        setLoading(true)
        try {
          props.fetchAndUpdate()
        } catch (err) {
          setFeedSuccess(false)
        }
      }}>Refresh</Button>
      {feedComponent}
    </>
  )
}