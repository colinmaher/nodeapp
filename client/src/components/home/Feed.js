import React, { useState, useEffect } from 'react';
// import fetch from 'isomorphic-fetch'
import Tweet from '../shared/Tweet'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'

export default function Feed(props) {
  // const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [feedSuccess, setFeedSuccess] = useState(true);
  const [feed, setFeed] = useState([]);
  // const [dumbFeed, setDumbFeed] = useState([
  //   {
  //     text: "hello"
  //   },
  //   {
  //     text: "world"
  //   },
  //   {
  //     text: "#hello @there #general"
  //   }
  // ]);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const [drawerOpen, setDrawerOpen] = React.useState(false);
  useEffect(() => {
    async function waitForTweets() {
      setLoading(true)
      try {
        const tweets = await props.userData.tweets
        setFeed(tweets)
        setFeedSuccess(true)
      }
      catch (err) {
        setFeedSuccess(false)
      }
      setLoading(false)
    }
    waitForTweets()
  })
  return (
    <>
      <Button onClick={() => setLoading(true)}>Refresh</Button>
      {
        !loading
          ? feedSuccess ? feed.map((tweet) => <Tweet tweet={tweet}></Tweet>) : <Typography variant="body1">Error fetching tweets</Typography>
          : <Typography variant="h6">Loading</Typography>
      }
    </>
  )

}