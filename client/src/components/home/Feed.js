import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch'
import Tweet from '../shared/Tweet'
import { Typography } from '@material-ui/core';

export default function Feed(props) {
  // const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [feedSuccess, setFeedSuccess] = useState(null);
  const [feed, setFeed] = useState([]);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [drawerOpen, setDrawerOpen] = React.useState(false);
  useEffect(() => {
    fetchRelevantTweets()
  }, [loading])
  async function fetchRelevantTweets() {
    setLoading(true)
    const tweetPromise = await fetch('/tweets', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setFeed(res.tweets)
        setFeedSuccess(true)
      })
      .catch(err => {
        console.log(err)
        setFeedSuccess(false)
      });
    setLoading(false)
    return tweetPromise
  }



  return (
    <>
    {feedSuccess ? 
      feed.map((tweet) =>
        <Tweet tweet={tweet}></Tweet>
      ) : <Typography variant="h6">Loading</Typography>}
    </>
  )

}