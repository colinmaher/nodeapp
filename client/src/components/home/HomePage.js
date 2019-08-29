// src/Home.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import Feed from './Feed'
import TweetBox from './TweetBox'
import Container from '@material-ui/core/Container'

export default function HomePage(props) {
  const [authenticated, setAuthenticated] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      const auth = await props.auth.isAuthenticated();
      if (auth !== authenticated) {
        setAuthenticated({ auth })
      }
    })()
  }, [authenticated])

  // console.log(authenticated)
  if (authenticated === null) {
    return null
  }
  else if (authenticated.auth) {
    // console.log("authenticated")
    return (
      <Container m={1} maxWidth="sm">
        <TweetBox auth={props.auth}/>
        <Feed/>
      </Container>
    )
  }
  else {
    return <Redirect to={{ pathname: '/login' }}/>
  }

}