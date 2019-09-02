// src/Home.js

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Feed from './Feed'
import TweetBox from './TweetBox'
import Container from '@material-ui/core/Container'


export default function HomePage (props) {
  const [authenticated, setAuthenticated] = useState(null)
  useEffect(() => {
    async function checkAuthentication() {
      const auth = await props.auth.isAuthenticated()
      if (auth !== authenticated) {
        setAuthenticated(auth)
      }
    }
    checkAuthentication()
  })
  


  if (authenticated === null) return null;
  if (authenticated) return      (
    <Container m={1} maxWidth="sm">
      <TweetBox auth={props.auth}/>
      <Feed auth={props.auth}/>
    </Container>      
  )
  else return (<Redirect to={{ pathname: '/login' }}/> )
};
