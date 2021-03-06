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
import Box from '@material-ui/core/Box'
import HistoryIcon from '@material-ui/icons/History'
import HomeIcon from '@material-ui/icons/Home'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css'

const useStyles = makeStyles(theme => ({

}))

export default function HomePage() {
  const api = useContext(ApiContext)
  const dispatch = useDispatch()
  const classes = useStyles()
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

  async function initUserData() {
    let user = await auth.getUser()
    if (user === undefined) return
    if (authenticated === true) {
      const id = user.sub
      const token = await auth.getAccessToken()
      // const userData = await api.getUserData(id, token)
      dispatch(ACTIONS.userDataRequest(id, token))
    }
  }

  useEffect(() => {
    initUserData()
  })

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
    <Container m={1} maxWidth="md">
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
      {toggleFeed ? <HistoryFeed /> : <LatestFeed />}
    </Container>
  )
  else {
    if (toggleFeed === true) setToggleFeed(false)
    return (
      <Container m={2} maxWidth="md">
        <Box m={2}>
          <LatestFeed />
        </Box>
      </Container>
    )
  }


}
