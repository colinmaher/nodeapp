// src/Home.js

import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import ACTIONS from "../../actions/actions"
import { LatestFeed, HistoryFeed } from './Feed'
import TweetBox from './TweetBox'
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import HistoryIcon from '@material-ui/icons/History'
import HomeIcon from '@material-ui/icons/Home'
import { IconButton } from '@material-ui/core'

export default function HomePage() {
  const api = useContext(ApiContext)
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(null)
  const [toggleFeed, setToggleFeed] = useState(true)
  const auth = useContext(AuthContext)

  async function checkAuthentication() {
    const isAuth = await auth.isAuthenticated()
    if (isAuth !== authenticated) {
      setAuthenticated(isAuth)
    }
  }

  useEffect(() => {
    checkAuthentication()
  })

  async function fetchAndUpdateHistory() {
    const user = await auth.getUser()
    if (user != null) {
      const token = await auth.getAccessToken()
      const data = await api.getUserData(user.sub, token)

      if (data !== undefined) {
        // console.log(data)
        data.tweets = data.tweets.reverse()
        dispatch(ACTIONS.setUserData(data))
      }
    }
  }

  async function fetchAndUpdateLatest(page, limit) {
    const data = await api.getLatestTweets(page, limit)
    if (data !== undefined) {
      // console.log(data)
      dispatch(ACTIONS.setLatestTweets(data))
    }
  }

  const feedIconProps = toggleFeed ? {
    color: 'primary'
  } : {
      color: 'disabled'
    }

  const latestIconProps = toggleFeed ? {
    color: 'disabled'
  } : {
      color: 'primary'
    }

  if (authenticated === null) return null;
  if (authenticated) return (
    <Container m={1} maxWidth="sm">
      <Grid container>
        <Grid item xs={12}>
          <TweetBox />
        </Grid>
      </Grid>
      <IconButton>
        <HomeIcon {...feedIconProps} fontSize="large" onClick={() => { setToggleFeed(true) }} />
      </IconButton>
      <IconButton>
        <HistoryIcon {...latestIconProps} fontSize="large" onClick={() => { setToggleFeed(false) }} />
      </IconButton>
      {toggleFeed ? <HistoryFeed fetchAndUpdate={fetchAndUpdateHistory} /> : <LatestFeed fetchAndUpdate={fetchAndUpdateLatest} />}
    </Container>
  )
  else return (<Redirect to={{ pathname: '/login' }} />)
}
