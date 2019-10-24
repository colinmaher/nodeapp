// src/Home.js

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom'
import fetch from 'isomorphic-fetch'
import Feed from './Feed'
import TweetBox from './TweetBox'
import Container from '@material-ui/core/Container'
// import { userDataReducer } from '../../reducers/reducers'
import ACTIONS from "../../actions/actions";

function HomePage(props) {
  const [authenticated, setAuthenticated] = useState(null)
  const [userDataError, setUserDataError] = useState(null)


  const dispatch = useDispatch()
  const userData = useSelector(state => {
    return state.userData
  });

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
      fetch('/user/' + auth.sub, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(userData => {
        //dispatch redux action setting user data
        console.log(userData)
        const jsonData = userData
        console.log(jsonData)
        dispatch(ACTIONS.setUserData(jsonData))
      }).catch((err) => {
        throw Error(err)
      })
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (authenticated === null) return null;
  if (authenticated) return (
    <Container m={1} maxWidth="sm">
      <TweetBox auth={props.auth} />
      <Feed auth={props.auth} />
    </Container>
  )
  else return (<Redirect to={{ pathname: '/login' }} />)
}

export default HomePage
