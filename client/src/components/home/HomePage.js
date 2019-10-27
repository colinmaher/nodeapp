// src/Home.js

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "../../actions/actions";
import fetch from 'isomorphic-fetch'
import Feed from './Feed'
import TweetBox from './TweetBox'
import Container from '@material-ui/core/Container'

function HomePage(props) {
  const [authenticated, setAuthenticated] = useState(null)
  const [userDataError, setUserDataError] = useState(null)


  const dispatch = useDispatch()
  // const userData = useSelector(state => {
  //   return state.userData
  // });

  async function checkAuthentication() {
    const auth = await props.auth.isAuthenticated()
    if (auth !== authenticated) {
      setAuthenticated(auth)
    }
  }
  useEffect(() => {
    checkAuthentication()
  })

  async function getUserData() {
    const auth = await props.auth.getUser()
    if (auth) {
      try {
        const newUserData = await fetch('/user/' + auth.sub, {
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
      <TweetBox auth={props.auth} />
      <Feed fetchAndUpdate={fetchAndUpdate} />
    </Container>
  )
  else return (<Redirect to={{ pathname: '/login' }} />)
}

export default HomePage
