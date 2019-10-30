// src/Home.js

import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "../../actions/actions";
import fetch from 'isomorphic-fetch'
import Feed from './Feed'
import TweetBox from './TweetBox'
import AuthContext from '../../contexts/AuthContext'
import Container from '@material-ui/core/Container'

function HomePage(props) {
  const [authenticated, setAuthenticated] = useState(null)
  const [userDataError, setUserDataError] = useState(null)
  const auth = useContext(AuthContext)

  const dispatch = useDispatch()
  // const userData = useSelector(state => {
  //   return state.userData
  // });

  async function checkAuthentication() {
    const isAuthenticated = await auth.isAuthenticated()
    if (isAuthenticated !== authenticated) {
      setAuthenticated(isAuthenticated)
    }
  }
  useEffect(() => {
    checkAuthentication()
  })

  async function getUserData() {
    const user = await auth.getUser()
    if (user) {
      try {
        const newUserData = await fetch('/user/' + user.sub, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        // console.log(newUserData)
        return newUserData.json()
      }
      catch (err) {
        throw Error(err)
      }
    }
  }
  async function fetchAndUpdate() {
    // console.log(getUserData)
    const data = await getUserData()

    if (data !== undefined) {
      // console.log(data)
      dispatch(ACTIONS.setUserData(data))
    }
  }

  useEffect(() => {
    fetchAndUpdate()
  }, [])

  if (authenticated === null) return null;
  if (authenticated) return (
    <Container m={1} maxWidth="sm">
      <TweetBox/>
      <Feed fetchAndUpdate={fetchAndUpdate} />
    </Container>
  )
  else return (<Redirect to={{ pathname: '/login' }} />)
}

export default HomePage
