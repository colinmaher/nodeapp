import React, { useState, useEffect } from 'react'
import {
  Redirect,
  useParams
} from "react-router-dom";
import HistoryFeed from "./Feed"
import Container from '@material-ui/core/Container'

function GenericProfilePage(props) {
  let { username } = useParams();
  console.log(props.auth.getUser())
  if (username !== props.auth.getUser().username) return (
    <Container m={1} maxWidth="sm">
      {/* <HistoryFeed fetchAndUpdate={fetchAndUpdate} /> */}
    </Container>
  )
  else return (<Redirect to={{ pathname: '/profile' }} />)
}
export default GenericProfilePage