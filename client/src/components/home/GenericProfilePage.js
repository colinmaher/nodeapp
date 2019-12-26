import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
  Redirect,
  useParams
} from "react-router-dom";
import { HistoryFeed } from "./Feed"
import Container from '@material-ui/core/Container'

function GenericProfilePage(props) {
  const { id } = useParams()
  const userData = useSelector(state => {
    return state.userData
  })
  console.log(id)
  console.log(userData.oktaId)
  if (id !== userData.oktaId) {

    return (
      <Container m={1} maxWidth="sm">
        <HistoryFeed id={id} />
      </Container>
    )
  }
  else return (<Redirect to={{ pathname: '/profile' }} />)
}
export default GenericProfilePage