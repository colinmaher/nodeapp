// src/Home.js

import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from "react-redux";
import ACTIONS from "../../actions/actions";
import Feed from './Feed'
import TweetBox from './TweetBox'
import AuthContext from '../../contexts/AuthContext'
import ApiContext from '../../contexts/ApiContext'
import Container from '@material-ui/core/Container'


export default function HomePage() {
  const api = useContext(ApiContext)
  const dispatch = useDispatch()
  const [authenticated, setAuthenticated] = useState(null)
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



  async function fetchAndUpdate() {
    // console.log(getUserData)
    const user = await auth.getUser()
    const data = await api.getUserData(user)

    if (data !== undefined) {
      // console.log(data)
      dispatch(ACTIONS.setUserData(data))
    }
  }

  useEffect(() => {
    fetchAndUpdate()
  })

  if (authenticated === null) return null;
  if (authenticated) return (
    <Container m={1} maxWidth="sm">
      <TweetBox />
      <Feed fetchAndUpdate={fetchAndUpdate} />
    </Container>
  )
  else return (<Redirect to={{ pathname: '/login' }} />)
}
