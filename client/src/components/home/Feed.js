import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch'
import Tweet from '../shared/Tweet'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'

export default function Feed(props) {
  // const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [feedSuccess, setFeedSuccess] = useState(true);
  const [feed, setFeed] = useState([]);
  const [dumbFeed, setDumbFeed] = useState([
    {
      text: "hello"
    }, 
    {
      text: "world"
    },
    {
      text: "#hello @there #general"
    }
  ]);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [drawerOpen, setDrawerOpen] = React.useState(false);
  useEffect(() => {
    // fetchRelevantTweets()
    setTimeout(()=>{ setLoading(false) }, 2000)
  }, [loading])
  async function fetchRelevantTweets() {
    if (loading) {
      const tweetPromise = await fetch('/tweets', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: {},
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
  }



  return (
    <>
      <Button onClick={() => setLoading(true)}>Refresh</Button>
      {
        !loading
          ? feedSuccess ? dumbFeed.map((tweet, i) => <Tweet key={i} tweet={tweet}></Tweet>) : <Typography variant="body1">Error fetching feed</Typography>
          : <Typography variant="h6">Loading</Typography>
      }
    </>
  )

}